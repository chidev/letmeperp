import { useState, useEffect } from 'react';
import { PreviewModal } from '@/components/preview-modal';
import { useLocation } from 'wouter';
import { useUrlGenerator } from '@/hooks/use-url-generator';
import { Search } from 'lucide-react';

export const Home = () => {
  const [location] = useLocation();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewQuery, setPreviewQuery] = useState('');
  const [query, setQuery] = useState('');
  const [showShareSection, setShowShareSection] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const { generateUrl, copyToClipboard } = useUrlGenerator();

  const handlePreview = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      alert('Please enter a search query!');
      return;
    }
    setPreviewQuery(searchQuery);
    setIsPreviewOpen(true);
  };

  const handleGenerateLink = () => {
    if (!query.trim()) {
      alert('Please enter a search query!');
      return;
    }
    const url = generateUrl(query);
    if (url) {
      setShowShareSection(true);
      // Smooth scroll to share section
      setTimeout(() => {
        document.getElementById('shareSection')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewQuery('');
  };

  const handleCopyLink = () => {
    const url = generateUrl(query);
    if (url) {
      copyToClipboard(url);
    }
  };

  const handleShareOnTwitter = () => {
    const url = generateUrl(query);
    if (url) {
      const tweetText = encodeURIComponent('Here, let me search that for you: ');
      window.open(`https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(url)}`, '_blank');
    }
  };

  // Handle URL query parameter on component mount
  useEffect(() => {
    if (!hasInitialized) {
      const urlParams = new URLSearchParams(location.split('?')[1] || '');
      const urlQuery = urlParams.get('q') || '';
      
      if (urlQuery) {
        // Set the query in the input field
        setQuery(urlQuery);
        // Auto-start the preview animation for shared links
        handlePreview(urlQuery);
      }
      setHasInitialized(true);
    }
  }, [location, hasInitialized]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
      <div className="clean-container">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <h1 className="clean-logo">perplexity</h1>
          <span className="clean-logo-badge">max</span>
        </div>
        
        {/* Tagline */}
        <p className="clean-tagline">Let Me Search That For You...</p>
        
        {/* Search Container */}
        <div className="clean-search-container">
          <input
            type="text"
            className="clean-search-input"
            placeholder="Ask anything. Type @ for mentions and / for shortcuts."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleGenerateLink();
              }
            }}
            autoFocus
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <button className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Button Group */}
        <div className="flex gap-4 justify-center mb-10 max-sm:flex-col max-sm:items-center">
          <button className="clean-btn clean-btn-primary max-sm:w-full" onClick={handleGenerateLink}>
            Generate Link
          </button>
          <button className="clean-btn clean-btn-secondary max-sm:w-full" onClick={() => handlePreview(query)}>
            Preview Animation
          </button>
        </div>
        
        {/* Share Section */}
        {showShareSection && (
          <div id="shareSection" className="clean-section fade-in">
            <h3 className="text-white mb-5 font-medium">All done! Share the link below:</h3>
            <div className="clean-share-link" onClick={handleCopyLink}>
              {generateUrl(query)}
            </div>
            <div className="flex gap-3 justify-center flex-wrap">
              <button className="clean-btn clean-btn-primary" onClick={handleCopyLink}>
                Copy URL
              </button>
              <button className="clean-btn clean-btn-secondary" onClick={handleShareOnTwitter}>
                Share on X
              </button>
              <button className="clean-btn clean-btn-secondary">
                Shorten Link
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          <p className="mb-4">
            "Let me Perplexity that" is for all those people that find it more convenient to bother you with their questions than to search it for themselves 😏
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href="#" className="hover:text-white transition-colors">What is this?</a>
            <span>|</span>
            <a href="https://letmegpt.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Let Me ChatGPT!</a>
            <span>|</span>
            <a href="https://letmegooglethat.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Original LMGTFY</a>
          </div>
          <p className="text-xs">
            Not associated with Perplexity AI in any way. This is a parody site.
            <br />
            2025 © LetMePerplexityThat.com - Made with friendly sarcasm 😄
          </p>
        </div>

        {/* Preview Modal */}
        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
          query={previewQuery}
        />
      </div>
    </div>
  );
};
