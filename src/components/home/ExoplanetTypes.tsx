import { motion } from 'framer-motion';

const types = [
  {
    name: 'Gas Giants',
    description: 'Massive planets composed primarily of hydrogen and helium, similar to Jupiter and Saturn. Many orbit extremely close to their stars as "Hot Jupiters".',
    characteristics: ['0.3-13 Jupiter masses', 'H₂ & He atmospheres', 'Possible rocky cores'],
    color: 'from-orange-500 to-yellow-600',
    image: 'pic/gas_gaint.jpeg',
  },
  {
    name: 'Super-Earths',
    description: 'Planets larger than Earth but smaller than Neptune. The most common type of exoplanet discovered, with diverse compositions.',
    characteristics: ['1.25-2 Earth radii', 'Rocky or water worlds', 'Potential for life'],
    color: 'from-blue-500 to-cyan-500',
    image: 'pic/super.jpeg',
  },
  {
    name: 'Neptune-like',
    description: 'Ice giants with thick atmospheres of hydrogen and helium surrounding a mantle of water, methane, and ammonia ices.',
    characteristics: ['2-6 Earth radii', 'Ice giant composition', 'Thick atmospheres'],
    color: 'from-indigo-500 to-blue-600',
    image: 'pic/nep.jpeg',
  },
  {
    name: 'Terrestrial',
    description: 'Rocky planets similar to Earth, Mars, Venus, and Mercury. Primarily composed of silicate rocks and metals.',
    characteristics: ['<1.25 Earth radii', 'Rocky composition', 'Solid surfaces'],
    color: 'from-red-500 to-orange-600',
    image: 'pic/ter.jpeg',
  },
];

export const ExoplanetTypes = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Types of Exoplanets
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Exoplanets come in a remarkable variety of sizes and compositions, many unlike anything in our solar system.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {types.map((type, index) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl"
              style={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
              }}
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div
                  className={`absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r ${type.color} text-white font-semibold`}
                >
                  {type.name}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {type.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Key Characteristics:</h4>
                  {type.characteristics.map((char, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2"
                        style={{ background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))` }}
                      />
                      <span className="text-sm text-muted-foreground">{char}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
