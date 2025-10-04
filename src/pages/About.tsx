const About = () => {
  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          About EXOVERSE
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Learn about our mission to explore distant worlds and democratize space exploration.
        </p>
        
        <div 
          className="p-8 rounded-2xl mb-8"
          style={{
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
          }}
        >
          <h2 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            EXOVERSE combines cutting-edge machine learning with real astronomical data to make 
            exoplanet discovery accessible to everyone. We believe that understanding our place 
            in the universe should be available to all.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Using data from NASA's Kepler and TESS missions, our AI models help identify potential 
            exoplanet candidates from light curve analysis, contributing to humanity's search for 
            worlds beyond our solar system.
          </p>
        </div>

        <div 
          className="p-8 rounded-2xl"
          style={{
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
          }}
        >
          <h2 className="text-2xl font-bold mb-4 text-foreground">Technology</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our platform leverages state-of-the-art machine learning algorithms trained on 
            thousands of confirmed exoplanet observations. We process light curve data to 
            identify the characteristic dimming patterns that indicate a planet passing in 
            front of its host star.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
