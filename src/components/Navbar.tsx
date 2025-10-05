import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/quiz', label: 'Quiz' },
    { path: '/discover', label: 'Discover' },
    { path: '/about', label: 'About' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50"
      style={{
        background: 'rgba(10, 14, 26, 0.8)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold tracking-wider bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            >
              PLANETEXO
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: isActive(item.path) ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                  background: isActive(item.path) ? 'hsl(var(--primary) / 0.1)' : 'transparent',
                }}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      border: '1px solid hsl(var(--primary) / 0.5)',
                      boxShadow: '0 0 20px hsl(var(--primary) / 0.3)',
                    }}
                  />
                )}
              </Link>
            ))}
            <a
              href="https://exoplanets.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>NASA</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 overflow-hidden"
            style={{ background: 'rgba(10, 14, 26, 0.95)' }}
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium transition-all"
                  style={{
                    color: isActive(item.path) ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                    background: isActive(item.path) ? 'hsl(var(--primary) / 0.1)' : 'transparent',
                    border: isActive(item.path) ? '1px solid hsl(var(--primary) / 0.5)' : '1px solid transparent',
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://exoplanets.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground"
              >
                <span>NASA Exoplanets</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
