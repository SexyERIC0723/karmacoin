import mongoose from 'mongoose';
import geoip from 'geoip-lite';

// 定义用户karma模型
const UserKarmaSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  country: { type: String, default: 'UNKNOWN' },
  karma_count: { type: Number, default: 0 },
}, { timestamps: true });

// 避免重复编译模型
let UserKarma;
try {
  UserKarma = mongoose.model('UserKarma');
} catch {
  UserKarma = mongoose.model('UserKarma', UserKarmaSchema);
}

// 连接数据库
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// 获取客户端IP
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || 
         req.connection?.remoteAddress?.replace('::ffff:', '') || 
         'unknown';
}

// API处理函数
export default async function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 连接数据库
    await connectDB();

    // 获取用户IP和地理位置
    const ip = getClientIp(req);
    const geo = geoip.lookup(ip) || { country: 'UNKNOWN' };
    const country = geo.country || 'UNKNOWN';

    console.log(`Karma request from IP: ${ip}, Country: ${country}`);

    // 查找或创建用户记录
    let user = await UserKarma.findOne({ ip });
    if (!user) {
      user = new UserKarma({ 
        ip, 
        country, 
        karma_count: 0 
      });
    }

    // 增加karma计数
    user.karma_count += 1;
    await user.save();

    // 返回结果
    res.status(200).json({ 
      karma_count: user.karma_count,
      country: user.country
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}