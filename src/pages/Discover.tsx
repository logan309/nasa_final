import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles } from 'lucide-react';

const Discover = () => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Discover Exoplanets
          </h1>
          <p className="text-muted-foreground text-lg mb-12">
            Upload light curve data from Kepler or TESS missions to analyze potential exoplanet transits using our AI model.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="p-8 rounded-2xl"
              style={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
              }}
            >
              <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Upload className="w-6 h-6 text-primary" />
                Upload Data
              </h2>

              <div
                onDragEnter={() => setIsDragging(true)}
                onDragLeave={() => setIsDragging(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                }}
                className="relative border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer group"
                style={{
                  borderColor: isDragging ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                  background: isDragging ? 'hsl(var(--primary) / 0.05)' : 'transparent',
                }}
              >
                <motion.div
                  animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                    }}
                  >
                    <Upload className="w-10 h-10 text-foreground" />
                  </div>

                  <p className="text-lg font-semibold mb-2 text-foreground">
                    {isDragging ? 'Drop your file here' : 'Drag & drop your file here'}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports CSV files from Kepler and TESS missions
                  </p>
                </motion.div>

                <input
                  type="file"
                  accept=".csv"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 px-6 py-4 rounded-xl font-semibold text-lg"
                style={{
                  background: 'linear-gradient(135deg, hsl(258, 90%, 66%), hsl(200, 98%, 39%))',
                  color: 'hsl(var(--foreground))',
                  boxShadow: '0 0 30px hsl(258 90% 66% / 0.4)',
                }}
              >
                Analyze Data
              </motion.button>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div
              className="p-8 rounded-2xl h-full"
              style={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
              }}
            >
              <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-secondary" />
                Analysis Results
              </h2>

              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <div
                  className="w-24 h-24 rounded-full mb-6 flex items-center justify-center opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--secondary) / 0.2))',
                  }}
                >
                  <Sparkles className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-lg mb-2">
                  No data analyzed yet
                </p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Upload a light curve data file to see AI-powered predictions about potential exoplanet transits
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          {[
            {
              title: 'Transit Method',
              description: 'Detects planets by measuring the dimming of starlight as a planet passes in front of its host star.',
            },
            {
              title: 'Machine Learning',
              description: 'Our AI model is trained on thousands of confirmed exoplanet light curves from NASA missions.',
            },
            {
              title: 'Instant Analysis',
              description: 'Get results in seconds with confidence scores and detailed predictions about the planet\'s characteristics.',
            },
          ].map((card, index) => (
            <div
              key={index}
              className="p-6 rounded-xl"
              style={{
                background: 'hsl(var(--card) / 0.5)',
                border: '1px solid hsl(var(--border))',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Discover;
