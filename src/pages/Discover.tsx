import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, HelpCircle, AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react';
import { toast } from "@/components/ui/sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

    // NOTE: This URL assumes your Python Flask server is running locally on port 5000
    try {
      const response = await fetch('http://localhost:5000/analyze_exoplanet', {
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

  const renderResults = () => {
    // --- Loading State ---
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

    // --- Results Display ---
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
          <div className="space-y-2">
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

    // --- Default Info Display ---
    return (
      <div className="h-full">
        <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-secondary" />
          AI Model Information
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          This AI service is trained on data from NASA's Kepler & TESS missions, specifically the Kepler Objects of Interest (KOI) and TESS Objects of Interest (TOI) datasets.
        </p>
        <p className="text-sm text-primary font-semibold mb-6">
          The model employed is XGBoost, chosen for its high accuracy in distinguishing true transits from false positives.
        </p>
        
        <div className="p-4 rounded-xl bg-muted/10 border border-muted/30">
            <h4 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-accent" />
                Next Steps
            </h4>
            <p className="text-sm text-muted-foreground">
                Please upload your own CSV file to begin classification. 
            </p>
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
                                    <li><span className="font-mono text-primary">OrbitalPeriod[days]</span></li>
                                    <li><span className="font-mono text-primary">OrbitalPeriodUpperUnc.[days]</span></li>
                                    <li><span className="font-mono text-primary">OrbitalPeriodLowerUnc.[days]</span></li>
                                    <li><span className="font-mono text-primary">TransitEpoch[BKJD]</span></li>
                                    <li><span className="font-mono text-primary">TransitEpochUpperUnc.[BKJD]</span></li>
                                    <li><span className="font-mono text-primary">TransitEpochLowerUnc.[BKJD]</span></li>
                                    <li><span className="font-mono text-primary">ImpactParamete</span></li>
                                    <li><span className="font-mono text-primary">ImpactParameterUpperUnc</span></li>
                                    <li><span className="font-mono text-primary">ImpactParameterLowerUnc</span></li>
                                    <li><span className="font-mono text-primary">TransitDuration[hrs]</span></li>
                                    <li><span className="font-mono text-primary">TransitDurationUpperUnc.[hrs]</span></li>
                                    <li><span className="font-mono text-primary">TransitDurationLowerUnc.[hrs]</span></li>
                                    <li><span className="font-mono text-primary">TransitDepth[ppm]</span></li>
                                    <li><span className="font-mono text-primary">TransitDepthUpperUnc.[ppm]</span></li>
                                    <li><span className="font-mono text-primary">TransitDepthLowerUnc.[ppm]</span></li>
                                    <li><span className="font-mono text-primary">PlanetaryRadius[Earthradii]</span></li>
                                    <li><span className="font-mono text-primary">PlanetaryRadiusUpperUnc.[Earthradii]</span></li>
                                    <li><span className="font-mono text-primary">PlanetaryRadiusLowerUnc.[Earthradii]</span></li>
                                    <li><span className="font-mono text-primary">EquilibriumTemperature[K]</span></li>
                                    <li><span className="font-mono text-primary">InsolationFlux[Earthflux]</span></li>
                                    <li><span className="font-mono text-primary">InsolationFluxUpperUnc.[Earthflux]</span></li>
                                    <li><span className="font-mono text-primary">InsolationFluxLowerUnc.[Earthflux]</span></li>
                                    <li><span className="font-mono text-primary">TransitSignal-to-Nois</span></li>
                                    <li><span className="font-mono text-primary">TCEPlanetNumbe</span></li>
                                    <li><span className="font-mono text-primary">StellarEffectiveTemperature[K]</span></li>
                                    <li><span className="font-mono text-primary">StellarEffectiveTemperatureUpperUnc.[K]</span></li>
                                    <li><span className="font-mono text-primary">StellarEffectiveTemperatureLowerUnc.[K]</span></li>
                                    <li><span className="font-mono text-primary">StellarSurfaceGravity[log10(cm/s**2)]</span></li>
                                    <li><span className="font-mono text-primary">StellarSurfaceGravityUpperUnc.[log10(cm/s**2)]</span></li>
                                    <li><span className="font-mono text-primary">StellarSurfaceGravityLowerUnc.[log10(cm/s**2)]</span></li>
                                    <li><span className="font-mono text-primary">StellarRadius[Solarradii]</span></li>
                                    <li><span className="font-mono text-primary">StellarRadiusUpperUnc.[Solarradii]</span></li>
                                    <li><span className="font-mono text-primary">StellarRadiusLowerUnc.[Solarradii]</span></li>
                                    <li><span className="font-mono text-primary">RA[decimaldegrees]</span></li>
                                    <li><span className="font-mono text-primary">Dec[decimaldegrees]</span></li>
                                    <li><span className="font-mono text-primary">Kepler-band[mag]</span></li>
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