import { useState } from 'react';
import { SearchForm } from '@/components/search-form';
import { PreviewModal } from '@/components/preview-modal';
import { SocialSharing } from '@/components/social-sharing';
import { useLocation } from 'wouter';

export const Home = () => {
  const [location] = useLocation();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewQuery, setPreviewQuery] = useState('');

  // Check if there's a query parameter in the URL
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const urlQuery = urlParams.get('q') || '';

  const handlePreview = (query: string) => {
    setPreviewQuery(query);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewQuery('');
  };

  // If there's a query in the URL, automatically start the preview
  if (urlQuery && !isPreviewOpen && !previewQuery) {
    handlePreview(urlQuery);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-[hsl(var(--perplexity-dark))]">
      {/* Header Logo */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl md:text-4xl font-semibold text-white font-inter">perplexity</span>
          <span className="ml-1 px-2 py-1 bg-[hsl(var(--perplexity-orange))] text-white text-sm font-medium rounded-md">max</span>
        </div>
        <p className="perplexity-text text-lg">Let Me Perplexity That For You...</p>
      </div>

      {/* Main Search Form */}
      <SearchForm onPreview={handlePreview} />

      {/* Social Sharing */}
      <div className="mt-8 w-full max-w-2xl">
        <SocialSharing
          url={window.location.href}
          query="sample search query"
        />
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm perplexity-text max-w-2xl">
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
  );
};
