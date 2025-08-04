import { useState, useEffect } from 'react';

interface PreviewAnimationProps {
  query: string;
  redirect: boolean; // true = redirect to Perplexity, false = preview mode
}

export const PreviewAnimation = ({ query, redirect }: PreviewAnimationProps) => {
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
          
          // If redirect mode, redirect to Perplexity
          if (redirect) {
            setTimeout(() => {
              const perplexityUrl = `https://www.perplexity.ai/?q=${encodeURIComponent(query)}`;
              window.location.href = perplexityUrl;
            }, 2000);
          }
        }, 2000);
      }, 500);
    }
  };

  useEffect(() => {
    if (query) {
      // Start animation after a brief delay
      setTimeout(() => {
        typeText(query);
      }, 500);
    }
  }, [query]);

  return (
    <div className="flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
      <div className="clean-container">
        <h3 className="text-white mb-8 font-medium text-xl text-center">
          {!redirect ? 'Preview Animation:' : 'Preparing your search...'}
        </h3>
        
        <div className="clean-section min-h-[400px] flex flex-col justify-center" style={{ marginBottom: 0 }}>
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
                {redirect ? (
                  <>
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
                ) : (
                  <>
                    <p className="mb-4">This is how your link will work!</p>
                    <p className="text-sm text-[var(--text-muted)]">
                      When someone visits your generated link, they'll see this animation and then be redirected to Perplexity.ai
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};