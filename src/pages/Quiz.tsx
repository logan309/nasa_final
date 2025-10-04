const Quiz = () => {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Exoplanet Quiz
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Test your knowledge about exoplanets and space exploration.
        </p>
        
        <div 
          className="p-8 rounded-2xl text-center"
          style={{
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
          }}
        >
          <p className="text-muted-foreground">Quiz coming soon! Check back later.</p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
