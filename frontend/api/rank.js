import mongoose from 'mongoose';

// 定义用户karma模型（与karma.js保持一致）
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

// API处理函数
export default async function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只允许GET请求
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 连接数据库
    await connectDB();

    // 聚合查询：按国家分组，计算总karma
    const rankings = await UserKarma.aggregate([
      {
        $group: {
          _id: '$country',
          total_karma: { $sum: '$karma_count' },
          user_count: { $sum: 1 } // 统计用户数量
        },
      },
      { 
        $sort: { total_karma: -1 } // 按总karma降序排列
      },
      { 
        $limit: 10 // 只取前10名
      },
    ]);

    // 格式化返回数据
    const formattedRankings = rankings.map((item, index) => ({
      rank: index + 1,
      country: item._id,
      total_karma: item.total_karma,
      user_count: item.user_count
    }));

    console.log(`Rank request - ${formattedRankings.length} countries found`);

    // 返回结果
    res.status(200).json(formattedRankings);

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}