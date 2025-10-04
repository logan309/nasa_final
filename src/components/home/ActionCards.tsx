import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HelpCircle, Sparkles, ExternalLink } from 'lucide-react';

const cards = [
  {
    icon: HelpCircle,
    title: 'Quiz Yourself',
    description: 'Test your knowledge of planetary science and exoplanet discovery facts.',
    to: '/quiz',
    gradient: 'from-primary to-primary/50',
  },
  {
    icon: Sparkles,
    title: 'Discover New Worlds',
    description: 'Run a new light curve data point through our AI classification model.',
    to: '/discover',
    gradient: 'from-secondary to-secondary/50',
  },
  {
    icon: ExternalLink,
    title: 'More Official Info',
    description: 'Explore the official NASA Exoplanet Archive and research papers.',
    href: 'https://exoplanets.nasa.gov/',
    gradient: 'from-accent to-accent/50',
  },
];

export const ActionCards = () => {
  return (
    <section id="action-cards" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const CardIcon = card.icon;
            const isExternal = 'href' in card;
            const Component = isExternal ? motion.a : motion(Link);
            const linkProps = isExternal ? { href: card.href, target: '_blank', rel: 'noopener noreferrer' } : { to: card.to };

            return (
              <Component
                key={card.title}
                {...linkProps}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative p-8 rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Gradient Border Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--${card.gradient.split('-')[1].split('/')[0]})) 0%, transparent 100%)`,
                    padding: '1px',
                    borderRadius: '1rem',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                  }}
                />

                {/* Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, hsl(var(--${card.gradient.split('-')[1].split('/')[0]}) / 0.2), transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${card.gradient}`}
                  >
                    <CardIcon className="w-6 h-6 text-foreground" />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {card.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>

                  <motion.div
                    className="mt-4 text-sm font-semibold flex items-center gap-2"
                    style={{ color: `hsl(var(--${card.gradient.split('-')[1].split('/')[0]}))` }}
                  >
                    <span>Explore</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </Component>
            );
          })}
        </div>
      </div>
    </section>
  );
};
