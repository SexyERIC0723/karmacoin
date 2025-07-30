import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const Game = () => {
  const [karma, setKarma] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const fishControls = useAnimation();
  const audioRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    audioRef.current = new Audio('/woodfish.mp3');

    const handleKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        triggerKarma();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const triggerKarma = async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      setClickCount(prev => prev + 1);
      
      // 调用API
      const res = await axios.post('/api/karma', {}, {
        timeout: 10000, // 10秒超时
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('API Response:', res.data); // 调试用
      setKarma(res.data.karma_count || 0);
  
      // 动画效果保持不变
      fishControls
        .start({ 
          scale: 0.85, 
          rotate: -8,
          filter: 'brightness(1.2)',
          transition: { duration: 0.15 } 
        })
        .then(() =>
          fishControls.start({ 
            scale: 1, 
            rotate: 0,
            filter: 'brightness(1)',
            transition: { duration: 0.15, type: "spring", stiffness: 300 } 
          })
        );
  
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
  
      setBubbles((prev) => [...prev, { 
        id: Date.now(),
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360
      }]);
  
      createParticles();
  
    } catch (err) {
      console.error('Karma API Error:', err);
      // 即使API失败，也显示本地效果
      setKarma(prev => prev + 1);
      
      // 可以添加错误提示
      setBubbles((prev) => [...prev, { 
        id: Date.now(),
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        isError: true // 标记为错误状态
      }]);
    } finally {
      setLoading(false);
    }
  };

  const createParticles = () => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i * 45) * (Math.PI / 180),
      speed: Math.random() * 3 + 2,
      life: 1
    }));
    setParticles(prev => [...prev, ...newParticles]);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4 text-center relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-orb"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400 rounded-full blur-orb"></div>
      </div>

      {/* Title section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
          🪷 Cyber Wooden Fish 🪷
        </h2>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Click the wooden fish or press spacebar to accumulate merit
        </p>
      </motion.div>

      {/* Merit counter card */}
      <motion.div 
        className="cyber-border p-6 mb-8 backdrop-blur-sm bg-gray-800/50 relative z-10"
        whileHover={{ scale: 1.02 }}
      >
        <p className="text-gray-400 text-sm mb-2">Your Current Karma</p>
        <p className="text-4xl font-bold karma-text">
          {karma.toLocaleString()}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Total clicks: {clickCount}
        </p>
      </motion.div>

      {/* Wooden fish main body */}
      <motion.div
        whileTap={{ scale: 0.85, rotate: -8 }}
        animate={fishControls}
        className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center cursor-pointer mb-8 ripple rounded-full glow-effect relative z-10"
        onClick={triggerKarma}
        whileHover={{ scale: 1.05 }}
      >
        <img
          src="/woodfish.png"
          alt="wooden fish"
          className="w-full h-full object-contain select-none pointer-events-none drop-shadow-2xl"
          draggable={false}
        />
      </motion.div>

      {/* Operation instructions */}
      <motion.div 
        className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 max-w-md relative z-10"
        animate={{ opacity: loading ? 0.6 : 1 }}
      >
        <p className="text-gray-300 text-sm">
          {loading ? (
            <span className="flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full mr-2"
              />
              Recording merits...
            </span>
          ) : (
            <>
              🖱️ Click the wooden fish or 
              <kbd className="mx-1 px-2 py-1 bg-gray-700 rounded text-xs">SPACE</kbd> 
              to accumulate merit
            </>
          )}
        </p>
      </motion.div>

      {/* Enhanced floating +1 effects */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ 
              opacity: 1, 
              y: 0, 
              x: bubble.x,
              scale: 0.5,
              rotate: bubble.rotation 
            }}
            animate={{ 
              opacity: 0, 
              y: -100, 
              scale: 1.2,
              rotate: bubble.rotation + 180 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute text-yellow-400 text-3xl font-bold pointer-events-none z-20"
            style={{ 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              textShadow: '0 0 10px rgba(245, 158, 11, 0.8)'
            }}
            onAnimationComplete={() =>
              setBubbles((prev) => prev.filter((item) => item.id !== bubble.id))
            }
          >
            +1 ✨
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Particle animation component */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              opacity: 1,
              x: 0,
              y: 0,
              scale: 0.5
            }}
            animate={{ 
              opacity: 0,
              x: Math.cos(particle.angle) * 80,
              y: Math.sin(particle.angle) * 80,
              scale: 1
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full pointer-events-none z-20"
            style={{ 
              top: '50%', 
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            onAnimationComplete={() =>
              setParticles(prev => prev.filter(p => p.id !== particle.id))
            }
          />
        ))}
      </AnimatePresence>
    </section>
  );
};

export default Game; 