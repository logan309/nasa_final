import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, HelpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from "@/components/ui/sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from 'react-router-dom';

const Discover = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("No file selected", { description: "Please upload a CSV file to analyze." });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append('file', file);
    
    // The conditional URL is no longer necessary as you will be deploying this final version
    // to GitHub Pages, which will use the live backend URL.
    const API_URL = 'https://nasa-final-api.onrender.com/';

    try {
      const response = await fetch(API_URL + '/analyze_exoplanet', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}. Ensure the Python server is running and the model is loaded.`);
      }

      const result = await response.json();
      setAnalysisResult(result);
      toast.success("Analysis complete!", { description: `Found ${result.prediction.filter(p => p === 1).length} potential exoplanets.` });
    } catch (error) {
      toast.error("Analysis failed", { description: error.message });
      console.error("Analysis error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const requiredFeatures = [
    { name: "Orbital Period", key: "OrbitalPeriod [days]", desc: "Time for the planet candidate to orbit the star." },
    { name: "Orbital Period Upper Unc.", key: "OrbitalPeriod Upper Unc. [days]", desc: "Upper uncertainty of the orbital period." },
    { name: "Orbital Period Lower Unc.", key: "OrbitalPeriod Lower Unc. [days]", desc: "Lower uncertainty of the orbital period." },
    { name: "Transit Epoch", key: "TransitEpoch [BKJD]", desc: "The time of the first detected transit." },
    { name: "Transit Epoch Upper Unc.", key: "TransitEpoch Upper Unc. [BKJD]", desc: "Upper uncertainty of the transit epoch." },
    { name: "Transit Epoch Lower Unc.", key: "TransitEpoch Lower Unc. [BKJD]", desc: "Lower uncertainty of the transit epoch." },
    { name: "Impact Parameter", key: "Impact Parameter", desc: "The projected distance between the planet and star centers." },
    { name: "Impact Parameter Upper Unc.", key: "Impact Parameter Upper Unc.", desc: "Upper uncertainty of the impact parameter." },
    { name: "Impact Parameter Lower Unc.", key: "Impact Parameter Lower Unc.", desc: "Lower uncertainty of the impact parameter." },
    { name: "Transit Duration", key: "Transit Duration [hrs]", desc: "The total time the transit lasts." },
    { name: "Transit Duration Upper Unc.", key: "Transit Duration Upper Unc. [hrs]", desc: "Upper uncertainty of the transit duration." },
    { name: "Transit Duration Lower Unc.", key: "Transit Duration Lower Unc. [hrs]", desc: "Lower uncertainty of the transit duration." },
    { name: "Transit Depth", key: "Transit Depth [ppm]", desc: "Measured drop in starlight (parts per million)." },
    { name: "Transit Depth Upper Unc.", key: "Transit Depth Upper Unc. [ppm]", desc: "Upper uncertainty of the transit depth." },
    { name: "Transit Depth Lower Unc.", key: "Transit Depth Lower Unc. [ppm]", desc: "Lower uncertainty of the transit depth." },
    { name: "Planetary Radius", key: "Planetary Radius [Earth radii]", desc: "Radius of the planet candidate relative to Earth." },
    { name: "Planetary Radius Upper Unc.", key: "Planetary Radius Upper Unc. [Earth radii]", desc: "Upper uncertainty of the planet's radius." },
    { name: "Planetary Radius Lower Unc.", key: "Planetary Radius Lower Unc. [Earth radii]", desc: "Lower uncertainty of the planet's radius." },
    { name: "Equilibrium Temperature", key: "Equilibrium Temperature [K]", desc: "The planet's equilibrium temperature in Kelvin." },
    { name: "Insolation Flux", key: "Insolation Flux [Earth flux]", desc: "The amount of stellar radiation received by the planet." },
    { name: "Insolation Flux Upper Unc.", key: "Insolation Flux Upper Unc. [Earth flux]", desc: "Upper uncertainty of the insolation flux." },
    { name: "Insolation Flux Lower Unc.", key: "Insolation Flux Lower Unc. [Earth flux]", desc: "Lower uncertainty of the insolation flux." },
    { name: "Transit Signal-to-Noise", key: "Transit Signal-to-Noise", desc: "A measure of the transit signal's strength." },
    { name: "TCE Planet Number", key: "TCE Planet Number", desc: "Planet number in the TCE." },
    { name: "Stellar Effective Temperature", key: "Stellar Effective Temperature [K]", desc: "Effective temperature of the host star." },
    { name: "Stellar Effective Temperature Upper Unc.", key: "Stellar Effective Temperature Upper Unc. [K]", desc: "Upper uncertainty of the star's temperature." },
    { name: "Stellar Effective Temperature Lower Unc.", key: "Stellar Effective Temperature Lower Unc. [K]", desc: "Lower uncertainty of the star's temperature." },
    { name: "Stellar Surface Gravity", key: "Stellar Surface Gravity [log10(cm/s**2)]", desc: "Surface gravity of the host star." },
    { name: "Stellar Surface Gravity Upper Unc.", key: "Stellar Surface Gravity Upper Unc. [log10(cm/s**2)]", desc: "Upper uncertainty of the star's surface gravity." },
    { name: "Stellar Surface Gravity Lower Unc.", key: "Stellar Surface Gravity Lower Unc. [log10(cm/s**2)]", desc: "Lower uncertainty of the star's surface gravity." },
    { name: "Stellar Radius", key: "Stellar Radius [Solar radii]", desc: "Radius of the host star relative to the Sun." },
    { name: "Stellar Radius Upper Unc.", key: "Stellar Radius Upper Unc. [Solar radii]", desc: "Upper uncertainty of the star's radius." },
    { name: "Stellar Radius Lower Unc.", key: "Stellar Radius Lower Unc. [Solar radii]", desc: "Lower uncertainty of the star's radius." },
    { name: "RA", key: "RA [decimal degrees]", desc: "Right ascension of the host star." },
    { name: "Dec", key: "Dec [decimal degrees]", desc: "Declination of the host star." },
    { name: "Kepler-band", key: "Kepler-band [mag]", desc: "The star's magnitude in the Kepler band." },
  ];

  const renderResults = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-t-4 border-secondary/50 rounded-full mb-6"
          />
          <p className="text-muted-foreground text-lg mb-2">
            Analyzing data...
          </p>
          <p className="text-sm text-muted-foreground max-w-md">
            Please wait while our AI model processes your light curve data.
          </p>
        </div>
      );
    }

    if (analysisResult) {
      const positiveCount = analysisResult.prediction.filter(p => p === 1).length;
      return (
        <div className="h-full">
          <h3 className="text-xl font-bold mb-4 text-foreground">Summary</h3>
          <div className="bg-primary/10 p-4 rounded-xl mb-6 flex items-center justify-between">
            <p className="text-primary font-semibold text-lg">
              {positiveCount} potential exoplanet(s) found.
            </p>
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-foreground">Detailed Results</h3>
          <div className="space-y-2 overflow-y-auto max-h-[300px]">
            {analysisResult.prediction.map((p, index) => (
              <div key={index} className="p-4 rounded-lg flex items-center justify-between transition-all" style={{
                background: p === 1 ? 'hsl(var(--secondary) / 0.1)' : 'hsl(var(--muted) / 0.1)',
                border: p === 1 ? '1px solid hsl(var(--secondary) / 0.5)' : '1px solid transparent'
              }}>
                <span className="font-medium text-foreground">Candidate {index + 1}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-primary">
                    {p === 1 ? 'EXOPLANET CANDIDATE' : 'FALSE POSITIVE'}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Confidence: <span className="font-semibold text-foreground">{(analysisResult.probability[index] * 100).toFixed(2)}%</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="h-full">
        <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-secondary" />
          AI Model Information
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          This AI service is trained on data from NASA's Kepler & TESS missions, specifically the **Kepler Objects of Interest (KOI)** and **TESS Objects of Interest (TOI)** datasets.
        </p>
        <p className="text-sm text-primary font-semibold mb-6">
          The model employed is **XGBoost**, chosen for its high accuracy in distinguishing true transits from false positives.
        </p>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-muted/10 border border-muted/30">
              <h4 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-accent" />
                  Next Steps
              </h4>
              <p className="text-sm text-muted-foreground">
                  Upload your own CSV file or use the provided sample data to begin classification. Ensure your Python backend server is running!
              </p>
          </div>
          <div className="p-4 rounded-xl bg-muted/10 border border-muted/30">
              <h4 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Explore Source Data
              </h4>
              <p className="text-sm text-muted-foreground">
                  You can explore the source databases used to train the model.
              </p>
              <div className="flex gap-4 mt-3">
                  <Link to="https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                      Kepler Archive
                  </Link>
                  <Link to="https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=TOI" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                      TESS Archive
                  </Link>
              </div>
          </div>
        </div>
      </div>
    );
  };

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
          {/* Left Column: Upload & Data Format */}
          <div className="space-y-8">
            {/* 1. Upload Section */}
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
                  onDrop={handleDragDrop}
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
                      {file ? file.name : (isDragging ? 'Drop your file here' : 'Drag & drop your file here')}
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
                    onChange={handleFileChange}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAnalyze}
                  disabled={isLoading || !file}
                  className="w-full mt-6 px-6 py-4 rounded-xl font-semibold text-lg"
                  style={{
                    background: 'linear-gradient(135deg, hsl(258, 90%, 66%), hsl(200, 98%, 39%))',
                    color: 'hsl(var(--foreground))',
                    boxShadow: '0 0 30px hsl(258 90% 66% / 0.4)',
                  }}
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Data'}
                </motion.button>
              </div>
            </motion.div>

            {/* 2. Data Format Instructions */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <div 
                    className="p-6 rounded-2xl"
                    style={{
                        background: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                    }}
                >
                    <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-accent" />
                        Required CSV Format
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                        For successful classification, your CSV file must contain the following features in its header:
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-b border-border/50">
                            <AccordionTrigger className="font-semibold text-foreground/80 hover:no-underline text-sm">
                                View Required Column Headers
                            </AccordionTrigger>
                            <AccordionContent className="pt-2">
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-2">
                                    <li><span className="font-mono text-primary">OrbitalPeriod [days]</span></li>
                                    <li><span className="font-mono text-primary">OrbitalPeriod Upper Unc. [days]</span></li>
                                    <li><span className="font-mono text-primary">OrbitalPeriod Lower Unc. [days]</span></li>
                                    <li><span className="font-mono text-primary">TransitEpoch [BKJD]</span></li>
                                    <li><span className="font-mono text-primary">TransitEpoch Upper Unc. [BKJD]</span></li>
                                    <li><span className="font-mono text-primary">TransitEpoch Lower Unc. [BKJD]</span></li>
                                    <li><span className="font-mono text-primary">Impact Parameter</span></li>
                                    <li><span className="font-mono text-primary">Impact Parameter Upper Unc.</span></li>
                                    <li><span className="font-mono text-primary">Impact Parameter Lower Unc.</span></li>
                                    <li><span className="font-mono text-primary">Transit Duration [hrs]</span></li>
                                    <li><span className="font-mono text-primary">Transit Duration Upper Unc. [hrs]</span></li>
                                    <li><span className="font-mono text-primary">Transit Duration Lower Unc. [hrs]</span></li>
                                    <li><span className="font-mono text-primary">Transit Depth [ppm]</span></li>
                                    <li><span className="font-mono text-primary">Transit Depth Upper Unc. [ppm]</span></li>
                                    <li><span className="font-mono text-primary">Transit Depth Lower Unc. [ppm]</span></li>
                                    <li><span className="font-mono text-primary">Planetary Radius [Earth radii]</span></li>
                                    <li><span className="font-mono text-primary">Planetary Radius Upper Unc. [Earth radii]</span></li>
                                    <li><span className="font-mono text-primary">Planetary Radius Lower Unc. [Earth radii]</span></li>
                                    <li><span className="font-mono text-primary">Equilibrium Temperature [K]</span></li>
                                    <li><span className="font-mono text-primary">Insolation Flux [Earth flux]</span></li>
                                    <li><span className="font-mono text-primary">Insolation Flux Upper Unc. [Earth flux]</span></li>
                                    <li><span className="font-mono text-primary">Insolation Flux Lower Unc. [Earth flux]</span></li>
                                    <li><span className="font-mono text-primary">Transit Signal-to-Noise</span></li>
                                    <li><span className="font-mono text-primary">TCE Planet Number</span></li>
                                    <li><span className="font-mono text-primary">Stellar Effective Temperature [K]</span></li>
                                    <li><span className="font-mono text-primary">Stellar Effective Temperature Upper Unc. [K]</span></li>
                                    <li><span className="font-mono text-primary">Stellar Effective Temperature Lower Unc. [K]</span></li>
                                    <li><span className="font-mono text-primary">Stellar Surface Gravity [log10(cm/s**2)]</span></li>
                                    <li><span className="font-mono text-primary">Stellar Surface Gravity Upper Unc. [log10(cm/s**2)]</span></li>
                                    <li><span className="font-mono text-primary">Stellar Surface Gravity Lower Unc. [log10(cm/s**2)]</span></li>
                                    <li><span className="font-mono text-primary">Stellar Radius [Solar radii]</span></li>
                                    <li><span className="font-mono text-primary">Stellar Radius Upper Unc. [Solar radii]</span></li>
                                    <li><span className="font-mono text-primary">Stellar Radius Lower Unc. [Solar radii]</span></li>
                                    <li><span className="font-mono text-primary">RA [decimal degrees]</span></li>
                                    <li><span className="font-mono text-primary">Dec [decimal degrees]</span></li>
                                    <li><span className="font-mono text-primary">Kepler-band [mag]</span></li>
                                </ul>
                                <p className="mt-4 text-xs text-secondary-foreground">
                                    Note: Our backend automatically cleans special characters from these headers.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </motion.div>
          </div>
          

          {/* Right Column: Results/Info Section */}
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
              {renderResults()}
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