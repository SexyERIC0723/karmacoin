import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const scrollToGame = () => {
    const el = document.getElementById('game');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scandals = [
    {
      title: "Global Catholic Church Abuse Compensation Funds",
      content: "Billions of dollars in parishioner donations have been used to pay legal fees and settlements for clerical sexual-abuse cases, exposing serious gaps in the Church's financial transparency."
    },
    {
      title: "Lavish Lifestyles of U.S. Televangelists", 
      content: "Some television preachers—such as Kenneth Copeland and Creflo Dollar—were revealed to have bought private jets and mansions with donation money, triggering a 2007 investigation by the U.S. Senate Finance Committee."
    },
    {
      title: "Opaque Finances of South Korea's Shincheonji Church",
      content: "The organisation has been accused of diverting offerings into real-estate speculation and political lobbying, all while refusing to publish open accounts."
    },
    {
      title: "Commercialisation Controversy of China's Shaolin Temple",
      content: "Abbot Shi Yongxin has repeatedly been linked to multiple companies and luxury cars. Ticket revenue and donation flows remain murky despite official statements."
    },
    {
      title: "Misappropriation Case in Japan's Koyasan Shingon Sect",
      content: "In 2019, a head priest was accused of siphoning tens of millions of yen in temple donations for personal investments, prompting criminal complaints and audit demands from devotees."
    }
  ];

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8">
            <span className="text-gradient-primary">
              Exposing Religious
            </span>
            <br />
            <span className="text-white">
              Donation Corruption
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed">
            KarmaCoin is not just a meme coin, it's a <strong className="text-yellow-400">rebellion</strong> against 
            fake holiness, corrupted donations, and tax evasion under religious names.
          </p>
          
          <motion.button
            onClick={scrollToGame}
            className="bg-gradient-primary px-10 py-4 rounded-full text-xl font-bold text-gray-900 hover:scale-105 transition-all duration-300 shadow-2xl glow-effect"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⚡ Enter the Cyber Temple ⚡
          </motion.button>
        </motion.div>

        {/* Scandals Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-gradient-primary">
              📰 Notorious Religious Donation Scandals
            </span>
          </h2>
          
          <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto text-lg">
            The following cases are collected from public reports. They remind us to donate responsibly and demand radical transparency:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {scandals.map((scandal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="cyber-border rounded-xl p-6 bg-gray-800/30 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
              >
                <h3 className="font-bold text-yellow-400 mb-3 text-lg leading-tight">
                  {scandal.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {scandal.content}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What is KarmaCoin Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="cyber-border rounded-2xl p-8 md:p-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            <span className="text-gradient-primary">
              🪷 What Is KarmaCoin? 🪷
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-lg leading-relaxed">
            <div className="space-y-4">
              <p className="text-gray-300">
                • One tap of the digital wooden fish forges <strong className="karma-text">1 Cyber-Karma Token (CKT)</strong>—a merit that lives forever on the chain.
              </p>
              <p className="text-gray-300">
                • The blockchain is our scripture; every transaction is a line of the cyber-sutra.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-300">
                • A border-less leaderboard turns global virtue into friendly competition, not blind obedience.
              </p>
              <p className="text-gray-300">
                • No clergy, no middlemen—just immutable code, public ledgers, and open-source faith.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-900/50 rounded-xl border border-yellow-400/20">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Join us and become a <strong className="karma-text">node-bhikkhu</strong> in this virtual monastery. 
              Meditate in code, mint your merit, and let the light of transparency burn away the darkness of corruption.
            </p>
            <p className="text-sm text-gray-500 italic">
              Disclaimer: KarmaCoin is an experimental, community-driven meme project. 
              No promises, no guarantees—only cyber-faith and verifiable vibes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home; 