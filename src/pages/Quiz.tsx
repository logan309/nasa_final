import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Rocket, CheckCircle, XCircle, ArrowRight, RotateCw, BookOpen } from 'lucide-react';

// Importing necessary UI components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Importing the full question set
import { allQuestions, Question } from '@/data/quizData';

// --- Constants ---
const QUIZ_LENGTH = 10;
const PASS_SCORE = QUIZ_LENGTH / 2; // Pass mark is 5 out of 10

// Simple Fisher-Yates shuffle implementation using a random seed for unique quizzes
const shuffleArray = (array: any[], seed: number) => {
  const shuffled = [...array];
  let m = shuffled.length;
  let t;
  let i;

  // Simple PRNG function to ensure repeatable shuffle within a quiz instance
  const prng = () => (Math.sin(seed++) * 10000) - Math.floor(Math.sin(seed++) * 10000);

  while (m) {
    // Generate a pseudo-random index
    i = Math.floor(Math.abs(prng()) % m);
    m--;

    // Swap elements
    t = shuffled[m];
    shuffled[m] = shuffled[i];
    shuffled[i] = t;
  }
  return shuffled;
};

// --- Main Component ---
const Quiz = () => {
  const [quizState, setQuizState] = useState<'start' | 'in-progress' | 'results'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [shuffleSeed, setShuffleSeed] = useState(Math.random());

  // Memoize the quiz questions: shuffles and selects 10 questions and shuffles their options
  const quizQuestions = useMemo(() => {
    // 1. Shuffle the entire pool of questions using the current seed
    const shuffledQuestions = shuffleArray(allQuestions, shuffleSeed);
    
    // 2. Select the first N questions
    const selectedQuestions = shuffledQuestions.slice(0, QUIZ_LENGTH);

    // 3. Shuffle options for each selected question
    return selectedQuestions.map((q, index) => ({
      ...q,
      // Use a new unique seed (derived from the shuffle seed and index) for options
      options: shuffleArray(q.options, shuffleSeed + index), 
    }));
  }, [shuffleSeed]); // Dependency ensures a new quiz starts when shuffleSeed changes

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleStartQuiz = useCallback(() => {
    // Reset state and generate a new random seed to ensure a new, randomized quiz
    setShuffleSeed(Math.random()); 
    setUserAnswers({});
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizState('in-progress');
  }, []);

  const handleAnswerSelect = (value: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_LENGTH - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      calculateResults();
      setQuizState('results');
    }
  };

  const calculateResults = () => {
    let finalScore = 0;
    quizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.answer) {
        finalScore++;
      }
    });
    setScore(finalScore);
  };

  // --- Rendering Functions ---

  const renderStartScreen = () => (
    <Card className="max-w-xl mx-auto p-6" style={{ border: '2px solid hsl(var(--primary))' }}>
      <CardHeader>
        <Rocket className="w-10 h-10 text-primary mb-3 mx-auto" />
        <CardTitle className="text-3xl text-center">Exoplanet Explorer Quiz</CardTitle>
        <CardDescription className="text-center mt-2 text-lg">
          Test your knowledge of extrasolar planets and the missions that discover them.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground">
          You will face **{QUIZ_LENGTH} random questions** selected from a pool of **{allQuestions.length}+ facts**. Each time you start, you get a new set of questions!
        </p>
        <div className="pt-2 text-sm text-foreground space-y-1">
          <h4 className="font-semibold flex items-center justify-center gap-2 text-primary"><BookOpen className="w-4 h-4" /> Topics Covered:</h4>
          <p className="text-muted-foreground text-xs">Fundamentals, Detection Methods, Missions, Exoplanet Types, Famous Worlds</p>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button onClick={handleStartQuiz} size="lg" className="w-full text-lg">
          Start Quiz Journey
        </Button>
      </CardFooter>
    </Card>
  );

  const renderQuestion = (question: Question) => {
    const isAnswered = !!userAnswers[question.id];

    return (
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="space-y-6 p-6 md:p-8"
      >
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-semibold text-secondary">
            Question {currentQuestionIndex + 1} of {QUIZ_LENGTH}
          </CardTitle>
          <CardDescription className="text-2xl text-foreground pt-4 leading-relaxed">
            {question.question}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-0">
          <RadioGroup 
            value={userAnswers[question.id] || ''} 
            onValueChange={handleAnswerSelect}
            className="space-y-4"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-colors">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>

        <CardFooter className="flex justify-between items-center p-0 pt-4">
          <div className="text-sm text-muted-foreground">
            Category: {question.category}
          </div>
          <Button 
            onClick={handleNextQuestion} 
            disabled={!isAnswered}
            className="flex items-center gap-2"
          >
            {currentQuestionIndex < QUIZ_LENGTH - 1 ? (
              <>Next Question <ArrowRight className="w-4 h-4" /></>
            ) : (
              'Finish Quiz'
            )}
          </Button>
        </CardFooter>
      </motion.div>
    );
  };

  const renderResultsScreen = () => {
    const percentage = ((score / QUIZ_LENGTH) * 100).toFixed(0);
    const passed = score >= PASS_SCORE; 

    const ResultIcon = passed ? CheckCircle : XCircle;
    const resultColor = passed ? 'hsl(var(--secondary))' : 'hsl(var(--destructive))';
    const resultText = passed ? 'Mission Success!' : 'Mission Needs Review...';
    const resultDescription = passed ? 
      'Excellent work! You are well-prepared for exploring the exoverse.' : 
      `You need at least ${PASS_SCORE} correct answers to pass. Review the facts below to improve your deep-space knowledge.`;

    return (
      <Card className="max-w-3xl mx-auto p-6 md:p-8">
        <CardHeader className="text-center pb-6">
          <ResultIcon className="w-12 h-12 mb-3 mx-auto" style={{ color: resultColor }} />
          <CardTitle className="text-4xl" style={{ color: resultColor }}>
            {resultText}
          </CardTitle>
          <CardDescription className="text-xl pt-2">{resultDescription}</CardDescription>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <div className="text-4xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {score} / {QUIZ_LENGTH}
            </span>
            <span className="text-muted-foreground text-2xl ml-3">({percentage}%)</span>
          </div>
          
          <h3 className="text-2xl font-bold border-b border-border/50 pb-2 flex items-center gap-2 justify-center">
             <Lightbulb className="w-6 h-6 text-accent" /> Review Answers
          </h3>

          <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
            {quizQuestions.map((q, index) => {
              const userAnswer = userAnswers[q.id];
              const isCorrect = userAnswer === q.answer;
              
              return (
                <div key={q.id} className="p-4 rounded-xl" style={{
                  background: isCorrect ? 'hsl(var(--secondary) / 0.1)' : 'hsl(var(--destructive) / 0.1)',
                  border: `1px solid ${isCorrect ? 'hsl(var(--secondary) / 0.5)' : 'hsl(var(--destructive) / 0.5)'}`
                }}>
                  <p className="font-semibold text-foreground mb-1">Q{index + 1}: {q.question}</p>
                  <p className="text-sm">
                    **Your Answer:** <span className={`font-medium ${isCorrect ? 'text-secondary' : 'text-destructive'}`}>
                      {userAnswer} {isCorrect ? ' (Correct)' : ' (Incorrect)'}
                    </span>
                  </p>
                  {!isCorrect && (
                    <>
                      <p className="text-sm mt-1">
                        **Correct Answer:** <span className="font-medium text-secondary">{q.answer}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        **Explanation:** {q.explanation}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>

        <CardFooter className="justify-center pt-6">
          <Button onClick={() => setQuizState('start')} size="lg" className="flex items-center gap-2">
            <RotateCw className="w-4 h-4" /> Try Another Mission
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const renderCurrentState = () => {
    switch (quizState) {
      case 'start':
        return renderStartScreen();
      case 'in-progress':
        // Ensure the question exists before rendering
        return currentQuestion ? (
            <AnimatePresence mode="wait">
                {renderQuestion(currentQuestion)}
            </AnimatePresence>
        ) : null;
      case 'results':
        return renderResultsScreen();
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Exoplanet Quiz
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Test your knowledge about exoplanets, detection methods, and space missions. Every quiz is a new, randomized challenge!
        </p>
        
        <div 
          className="rounded-2xl"
          style={{
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
          }}
        >
          {/* AnimatePresence moved inside the container for smooth transitions */}
          {renderCurrentState()}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
