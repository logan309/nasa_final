import { Link } from 'react-router-dom';
import { Rocket, Mail, Github, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Team Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ABC Coding
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Exploring the universe through code and innovation. 
              Building next-generation platforms for space exploration and discovery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link to="/discover" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Discover
              </Link>
              <Link to="/quiz" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Quiz
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                About
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Connect With Us</h4>
            <div className="flex gap-4 mb-4">
              <a 
                href="mailto:shashankgowda1236628@gmail.com" 
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/logan309" 
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              
            </div>
            <p className="text-muted-foreground text-xs">
              contact@abccoding.space
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} ABC Coding. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Powered by passion for space exploration 🚀
          </p>
        </div>
      </div>
    </footer>
  );
};
