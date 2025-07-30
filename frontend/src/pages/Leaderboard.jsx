import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanks = async () => {
      try {
        const res = await axios.get('/api/rank');
        setRanks(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRanks();
    const interval = setInterval(fetchRanks, 10000);
    return () => clearInterval(interval);
  }, []);

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '🏅';
    }
  };

  const getRankStyle = (index) => {
    switch (index) {
      case 0: return 'from-yellow-400 to-yellow-600';
      case 1: return 'from-gray-400 to-gray-600';
      case 2: return 'from-orange-400 to-orange-600';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            🏆 Global Karma Leaderboard
          </h2>
          <p className="text-gray-400 text-lg">
            Top 10 countries spreading cyber enlightenment
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {ranks.map((item, index) => (
              <motion.div
                key={item.country}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`cyber-border rounded-xl p-6 bg-gradient-to-r ${getRankStyle(index)} bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">
                      {getRankIcon(index)}
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        #{index + 1}
                      </p>
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-white">
                        {item.country}
                      </p>
                      <p className="text-sm text-gray-400">
                        Country/Region
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold karma-text">
                      {item.total_karma.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      Total Karma
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {ranks.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-400 mb-4">🪷</p>
                <p className="text-gray-500">No karma data yet. Be the first to contribute!</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Real-time update notification */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            🔄 Updates every 10 seconds
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Leaderboard; 