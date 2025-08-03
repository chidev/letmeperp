import { useEffect } from 'react';
import { useLocation } from 'wouter';

export const Preview = () => {
  const [location] = useLocation();
  
  useEffect(() => {
    // Extract query from URL and redirect to Perplexity
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const query = urlParams.get('q') || '';
    
    if (query) {
      const perplexityUrl = `https://www.perplexity.ai/?q=${encodeURIComponent(query)}`;
      window.location.href = perplexityUrl;
    } else {
      // Redirect to home if no query
      window.location.href = '/';
    }
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--perplexity-dark))]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--perplexity-orange))] mx-auto mb-4"></div>
        <p className="text-white">Redirecting to Perplexity...</p>
      </div>
    </div>
  );
};
