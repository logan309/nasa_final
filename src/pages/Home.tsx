import { Hero } from '@/components/home/Hero';
import { ActionCards } from '@/components/home/ActionCards';

const Home = () => {
  return (
    <div className="relative">
      <Hero />
      <ActionCards />
      
      {/* What Are Exoplanets Section */}
      <section id="what-are-exoplanets" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 pb-4 border-b-2 border-primary/30 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            What Are Exoplanets?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                Exoplanets, or extrasolar planets, are worlds that orbit stars beyond our Sun. 
                They represent one of the most exciting frontiers in modern astronomy and fundamentally 
                transform our understanding of planetary systems.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                Since the groundbreaking discovery in 1995, astronomers have confirmed over <span className="text-primary font-semibold">5,500 exoplanets</span> across 
                more than 4,000 different planetary systems. NASA's Kepler Space Telescope alone 
                discovered over 2,600 confirmed exoplanets during its mission from 2009 to 2018.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                These distant worlds show us that planetary systems can be vastly different from our own, 
                with hot Jupiters orbiting closer to their stars than Mercury does to our Sun, or multiple 
                Earth-sized planets packed tightly around small red dwarf stars.
              </p>
            </div>
            
            <div className="order-1 md:order-2 relative">
              <div className="relative rounded-2xl overflow-hidden" style={{ border: '2px solid hsl(var(--primary) / 0.3)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <img 
                  src="https://science.nasa.gov/wp-content/uploads/2023/09/types-of-exoplanets-jpeg.webp"
                  alt="Types of Exoplanets" 
                  className="w-full h-auto relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '5,500+', label: 'Confirmed Exoplanets' },
              { value: '4,000+', label: 'Planetary Systems' },
              { value: '2,600+', label: 'Kepler Discoveries' },
              { value: '100+', label: 'Habitable Zone Planets' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl"
                style={{
                  background: 'hsl(var(--card) / 0.5)',
                  border: '1px solid hsl(var(--border))',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
