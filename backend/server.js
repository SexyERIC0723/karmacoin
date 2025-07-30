import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import geoip from 'geoip-lite';

import UserKarma from './src/models/UserKarma.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/karmacoin';

const app = express();

// Enhanced CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://karmacoin.fun', 'https://www.karmacoin.fun']
    : ['http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get client IP
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress?.replace('::ffff:', '') || '';
}

// POST /api/karma — Click wooden fish +1 karma
app.post('/api/karma', async (req, res) => {
  try {
    const ip = getClientIp(req);
    const geo = geoip.lookup(ip) || { country: 'UNKNOWN' };
    const country = geo.country || 'UNKNOWN';

    let user = await UserKarma.findOne({ ip });
    if (!user) {
      user = new UserKarma({ ip, country, karma_count: 0 });
    }
    user.karma_count += 1;
    await user.save();

    res.json({ karma_count: user.karma_count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/rank — Top 10 countries by karma
app.get('/api/rank', async (req, res) => {
  try {
    const list = await UserKarma.aggregate([
      {
        $group: {
          _id: '$country',
          total_karma: { $sum: '$karma_count' },
        },
      },
      { $sort: { total_karma: -1 } },
      { $limit: 10 },
    ]);

    res.json(list.map((i) => ({ country: i._id, total_karma: i.total_karma })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Connect to database and start server
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); 