import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'A WORLD AWAY';

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Gradient Glow Effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 30%, hsl(258, 90%, 66% / 0.2) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6">
            <span 
              className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              style={{ 
                backgroundSize: '200% 200%',
                animation: 'shimmer 3s linear infinite'
              }}
            >
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-1"
              >
                |
              </motion.span>
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
        >
          Hunting for new worlds using machine learning and real data from Kepler and TESS missions. 
          Discover thousands of planets orbiting distant stars.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#what-are-exoplanets"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl font-semibold text-lg relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, hsl(258, 90%, 66%), hsl(200, 98%, 39%))',
              color: 'hsl(var(--foreground))',
              boxShadow: '0 0 30px hsl(258 90% 66% / 0.4)',
            }}
          >
            <span className="relative z-10">Explore Now</span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: 'linear-gradient(135deg, hsl(258, 90%, 76%), hsl(200, 98%, 49%))',
              }}
            />
          </motion.a>

          <motion.a
            href="https://exoplanets.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl font-semibold text-lg border transition-all"
            style={{
              borderColor: 'hsl(var(--primary) / 0.5)',
              color: 'hsl(var(--foreground))',
              background: 'hsl(var(--card) / 0.5)',
              backdropFilter: 'blur(10px)',
            }}
          >
            Learn More
          </motion.a>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 w-32 h-32 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(258, 90%, 66%), transparent)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 left-10 w-40 h-40 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(200, 98%, 39%), transparent)',
            filter: 'blur(40px)',
          }}
        />
      </div>
    </section>
  );
};