import mongoose from 'mongoose';

const UserKarmaSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true, unique: true },
    country: { type: String, default: 'UNKNOWN' },
    karma_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('UserKarma', UserKarmaSchema); 