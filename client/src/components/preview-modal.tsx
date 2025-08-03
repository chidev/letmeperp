import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
}

const animationSteps = [
  { id: 1, text: "Go to perplexity.ai", icon: "🌐" },
  { id: 2, text: "Click on the search box", icon: "🔍" },
  { id: 3, text: "Type your question", icon: "⌨️" },
  { id: 4, text: "Press Enter or click search", icon: "🚀" },
];

export const PreviewModal = ({ isOpen, onClose, query }: PreviewModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < animationSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            // Redirect to Perplexity with the search query
            const perplexityUrl = `https://www.perplexity.ai/search?q=${encodeURIComponent(query)}`;
            window.open(perplexityUrl, '_blank');
            onClose();
          }, 1000);
          return prev;
        }
      });
    }, 1500);
  };

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsAnimating(false);
  };

  useEffect(() => {
    if (!isOpen) {
      resetAnimation();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <DialogHeader className="border-b border-[hsl(var(--perplexity-border))] pb-4">
          <DialogTitle className="text-xl font-semibold text-white">Preview Search</DialogTitle>
        </DialogHeader>
        
        <div className="p-6">
          <div className="bg-[hsl(var(--perplexity-dark))] rounded-xl p-8 text-center">
            <div className="text-2xl font-semibold mb-8 text-white">
              How to search on Perplexity:
            </div>
            
            <div className="space-y-6 text-left max-w-md mx-auto">
              <AnimatePresence>
                {animationSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0.3, scale: 0.95 }}
                    animate={{
                      opacity: currentStep >= index ? 1 : 0.3,
                      scale: currentStep >= index ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                      currentStep >= index 
                        ? 'bg-[hsl(var(--perplexity-orange))]/20 border border-[hsl(var(--perplexity-orange))]/40' 
                        : 'bg-gray-800/30'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all duration-500 ${
                      currentStep >= index ? 'bg-[hsl(var(--perplexity-orange))]' : 'bg-gray-600'
                    }`}>
                      {currentStep >= index ? step.icon : step.id}
                    </div>
                    <span className="text-white">{step.text}</span>
                    {index === 2 && currentStep >= index && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        className="ml-2 px-2 py-1 bg-gray-700 rounded text-sm font-mono text-[hsl(var(--perplexity-orange))]"
                      >
                        "{query}"
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="mt-8">
              {!isAnimating ? (
                <Button
                  variant="perplexity"
                  onClick={startAnimation}
                  className="px-8 py-3 rounded-lg font-medium"
                >
                  Start Animation
                </Button>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[hsl(var(--perplexity-orange))]"></div>
                  <span className="text-[hsl(var(--perplexity-text))]">
                    {currentStep === animationSteps.length - 1 ? 'Redirecting to Perplexity...' : 'Playing animation...'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
