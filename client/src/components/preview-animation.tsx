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
            }, 50);
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
          
          {/* Fake Search Container - Perplexity Style */}
          <div className="w-full max-w-4xl mx-auto mb-8 px-4">
            <div className="relative bg-[#2f2f2f] rounded-2xl border border-[#404040] p-4">
              {/* Text Area - Full Width */}
              <div className="relative mb-4">
                <span className="text-white text-base block leading-relaxed text-left">
                  {typedText}
                  {!showResults && <span className="typing-cursor"></span>}
                </span>
                {!typedText && (
                  <span className="absolute top-0 left-0 text-gray-400 text-base pointer-events-none">
                    Ask anything. Type @ for mentions and / for shortcuts.
                  </span>
                )}
              </div>
              
              {/* Icons Row - Right Aligned */}
              <div className="flex justify-end items-center gap-2">
                {/* Attach Icon */}
                <button className="p-2 rounded-lg bg-transparent hover:bg-[#4f4f4f] transition-colors">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                
                {/* Mic Icon */}
                <button className="p-2 rounded-lg bg-transparent hover:bg-[#4f4f4f] transition-colors">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                
                {/* Submit Button - YELLOW with RIGHT arrow */}
                <button className="p-2 rounded-lg bg-[#FFD700] hover:bg-[#FFC107] transition-colors">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
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