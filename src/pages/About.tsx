import { Star, Code, Users } from 'lucide-react';

// Placeholder data for 6 team members
const teamMembers = [
  { name: "Shashank U", role: "Full Stack", initial: "SU", imgUrl: "https://placehold.co/100x100/8B5CF6/FFFFFF/png?text=SU" },
  { name: "Sachin R", role: "AI/ML Lead", initial: "SR", imgUrl: "https://placehold.co/100x100/06B6D4/FFFFFF/png?text=SR" },
  { name: "Darshan K R", role: "Project Manager", initial: "DK", imgUrl: "https://placehold.co/100x100/EC4899/FFFFFF/png?text=DK" },
  { name: "Rudresh", role: "Frontend Lead", initial: "RR", imgUrl: "https://placehold.co/100x100/3B82F6/FFFFFF/png?text=RR" },
  { name: "Gagan Gowda", role: "Backend Architect", initial: "GG", imgUrl: "https://placehold.co/100x100/F59E0B/FFFFFF/png?text=GG" },
  { name: "Shiva M", role: "UI/UX Designer", initial: "SM", imgUrl: "https://placehold.co/100x100/10B981/FFFFFF/png?text=SM" },
];

const About = () => {
  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header --- */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          About PLANETEXO
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Learn about our mission to explore distant worlds, the technology powering our platform, and the team behind the project.
        </p>
        
        {/* --- 1. Our Mission --- */}
        <div 
          className="p-8 rounded-2xl mb-12"
          style={{
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
          }}
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground flex items-center gap-3">
            <Star className="w-6 h-6 text-primary" />
            Our Mission & Impact
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            PLANETEXO was built during the Lovable Hackathon to democratize exoplanet discovery. We use cutting-edge machine learning, specifically a highly accurate XGBoost model, trained on real astronomical data from NASA's Kepler and TESS missions. 
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            Our goal is to make the process of identifying potential planetary transit candidates more accessible to citizen scientists and accelerate the pace of space discovery, contributing to humanity's search for worlds beyond our solar system.
          </p>
        </div>

        {/* --- 2. Technology Stack --- */}
        <div 
          className="p-8 rounded-2xl mb-12"
          style={{
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
          }}
        >
          <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
            <Code className="w-6 h-6 text-secondary" />
            Technology Stack
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold text-lg text-primary">Frontend</h3>
                <p className="text-sm text-muted-foreground">React, TypeScript, Vite, Framer Motion (for animations), shadcn/ui.</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold text-lg text-secondary">AI/Backend</h3>
                <p className="text-sm text-muted-foreground">Python, Flask (for API server), XGBoost, Pandas, Joblib (for model serialization).</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold text-lg text-accent">Styling</h3>
                <p className="text-sm text-muted-foreground">Tailwind CSS for responsive design and custom deep space theme.</p>
            </div>
          </div>
        </div>

        {/* --- 3. Our Team --- */}
        <div 
          className="p-8 rounded-2xl"
          style={{
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
          }}
        >
          <h2 className="text-3xl font-bold mb-8 text-foreground flex items-center gap-3">
            <Users className="w-6 h-6 text-accent" />
            The Team (ABC Coding)
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 rounded-xl transition-all hover:bg-background/70">
                <img
                    src={member.imgUrl}
                    alt={member.name}
                    className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-primary/50"
                    // Add a filter/shadow for visual interest
                    style={{ filter: 'grayscale(10%) drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))' }}
                />
                <h3 className="text-base font-semibold text-foreground truncate w-full">{member.name}</h3>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
