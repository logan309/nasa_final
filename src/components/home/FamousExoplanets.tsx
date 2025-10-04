import { motion } from 'framer-motion';
import { Star, Ruler, Thermometer, Clock, MapPin } from 'lucide-react';

const exoplanets = [
  {
    name: '51 Pegasi b',
    nickname: 'Dimidium',
    discovery: '1995',
    significance: 'First exoplanet discovered orbiting a Sun-like star, earning its discoverers the 2019 Nobel Prize in Physics.',
    stats: {
      distance: '50.45 light-years',
      type: 'Hot Jupiter',
      mass: '0.46 Jupiter masses',
      orbitalPeriod: '4.2 days',
      temperature: '~1,000°C',
    },
    image: 'https://placehold.co/600x400/FF6B35/FFF?text=51+Pegasi+b',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    name: 'Proxima Centauri b',
    nickname: 'Proxima b',
    discovery: '2016',
    significance: 'The closest known exoplanet to Earth, located in the habitable zone of our nearest stellar neighbor.',
    stats: {
      distance: '4.24 light-years',
      type: 'Super-Earth',
      mass: '1.27 Earth masses',
      orbitalPeriod: '11.2 days',
      temperature: '~234 K (-39°C)',
    },
    image: 'https://placehold.co/600x400/3B82F6/FFF?text=Proxima+Centauri+b',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'TRAPPIST-1e',
    nickname: 'The Habitable One',
    discovery: '2017',
    significance: 'One of seven Earth-sized planets in the TRAPPIST-1 system, considered the most likely to support life with conditions similar to Earth.',
    stats: {
      distance: '40.66 light-years',
      type: 'Terrestrial',
      mass: '0.69 Earth masses',
      orbitalPeriod: '6.1 days',
      temperature: '~246 K (-27°C)',
    },
    image: 'https://placehold.co/600x400/10B981/FFF?text=TRAPPIST-1e',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    name: 'HD 189733 b',
    nickname: 'The Blue Marble',
    discovery: '2005',
    significance: 'Famous for its deep blue color caused by silicate rain and winds reaching 8,700 km/h - the fastest known in any planetary atmosphere.',
    stats: {
      distance: '64.5 light-years',
      type: 'Hot Jupiter',
      mass: '1.13 Jupiter masses',
      orbitalPeriod: '2.2 days',
      temperature: '~1,200°C',
    },
    image: 'https://placehold.co/600x400/2563EB/FFF?text=HD+189733+b',
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    name: 'Kepler-452b',
    nickname: "Earth's Cousin",
    discovery: '2015',
    significance: 'Orbits in the habitable zone of a Sun-like star, with similar orbital period to Earth. The first near-Earth-size planet in the habitable zone.',
    stats: {
      distance: '1,400 light-years',
      type: 'Super-Earth',
      mass: '~5 Earth masses',
      orbitalPeriod: '385 days',
      temperature: '~265 K (-8°C)',
    },
    image: 'https://placehold.co/600x400/8B5CF6/FFF?text=Kepler-452b',
    gradient: 'from-purple-500 to-pink-500',
  },
];

export const FamousExoplanets = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Famous Exoplanets
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Discover some of the most fascinating and scientifically significant exoplanets ever found.
          </p>
        </motion.div>

        <div className="space-y-12">
          {exoplanets.map((planet, index) => (
            <motion.div
              key={planet.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div
                className="overflow-hidden rounded-2xl"
                style={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                }}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className={`relative h-80 md:h-auto overflow-hidden ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <img
                      src={planet.image}
                      alt={planet.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/80" />
                    
                    {/* Floating Badge */}
                    <div
                      className={`absolute top-6 left-6 px-4 py-2 rounded-full bg-gradient-to-r ${planet.gradient} text-white font-semibold text-sm backdrop-blur-sm`}
                    >
                      {planet.nickname}
                    </div>

                    {/* Discovery Year */}
                    <div
                      className="absolute bottom-6 right-6 px-4 py-2 rounded-full backdrop-blur-md text-sm font-semibold"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      Discovered {planet.discovery}
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`p-8 flex flex-col justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <h3 className="text-3xl font-bold mb-3 text-foreground">
                      {planet.name}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {planet.significance}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Distance</div>
                          <div className="text-sm font-semibold text-foreground">{planet.stats.distance}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Type</div>
                          <div className="text-sm font-semibold text-foreground">{planet.stats.type}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Ruler className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Mass</div>
                          <div className="text-sm font-semibold text-foreground">{planet.stats.mass}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Orbital Period</div>
                          <div className="text-sm font-semibold text-foreground">{planet.stats.orbitalPeriod}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 col-span-2">
                        <Thermometer className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Temperature</div>
                          <div className="text-sm font-semibold text-foreground">{planet.stats.temperature}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
