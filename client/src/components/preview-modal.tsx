import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
}

export const PreviewModal = ({ isOpen, onClose, query }: PreviewModalProps) => {
  const [typedText, setTypedText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showReadyMessage, setShowReadyMessage] = useState(false);

  const typeText = (text: string, index: number = 0) => {
    if (index < text.length) {
      setTypedText(text.slice(0, index + 1));
      setTimeout(() => typeText(text, index + 1), 80);
    } else {
      // Show results after typing completes
      setTimeout(() => {
        setShowResults(true);
        
        // Show ready message after 2 seconds
        setTimeout(() => {
          setShowReadyMessage(true);
          
          // Redirect after another 2 seconds
          setTimeout(() => {
            const perplexityUrl = `https://www.perplexity.ai/?q=${encodeURIComponent(query)}`;
            window.open(perplexityUrl, '_blank');
            onClose();
          }, 2000);
        }, 2000);
      }, 500);
    }
  };

  const resetAnimation = () => {
    setTypedText('');
    setShowResults(false);
    setShowReadyMessage(false);
  };

  useEffect(() => {
    if (!isOpen) {
      resetAnimation();
    } else if (isOpen && !typedText) {
      // Auto-start animation when modal opens
      setTimeout(() => {
        typeText(query);
      }, 500);
    }
  }, [isOpen, query]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden border-[var(--border)]" style={{ backgroundColor: 'var(--muted)' }}>
        <DialogHeader className="sr-only">
          <DialogTitle>Preview Animation</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <h3 className="text-white mb-5 font-medium text-xl text-center">Preview Animation:</h3>
          
          <div className="clean-section min-h-[400px] flex flex-col justify-center" style={{ backgroundColor: 'var(--background)', marginBottom: 0 }}>
            {/* Fake Perplexity Logo */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="clean-logo">perplexity</span>
              <span className="clean-logo-badge">max</span>
            </div>
            
            {/* Fake Search Container */}
            <div className="clean-search-container max-w-[600px] mx-auto mb-8">
              <span className="text-white text-base">{typedText}</span>
              {!showResults && <span className="typing-cursor"></span>}
            </div>
            
            {/* Fake Results */}
            <div className={`text-center text-[var(--text-secondary)] transition-opacity duration-500 ${showResults ? 'opacity-100' : 'opacity-0'}`}>
              {!showReadyMessage ? (
                <>
                  <p className="mb-2">
                    Searching<span className="inline-block animate-pulse">...</span>
                  </p>
                  <p className="text-sm">Processing your query with AI-powered search</p>
                </>
              ) : (
                <>
                  <p className="mb-2" style={{ color: 'var(--primary)' }}>✓ Ready!</p>
                  <p className="mb-4">Redirecting to Perplexity.ai...</p>
                  <p className="text-sm">
                    <a 
                      href={`https://www.perplexity.ai/?q=${encodeURIComponent(query)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--primary)] hover:underline"
                    >
                      Click here if not redirected automatically
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
