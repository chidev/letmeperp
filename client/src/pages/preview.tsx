import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { PreviewAnimation } from '@/components/preview-animation';

export const Preview = () => {
  const [location] = useLocation();
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Extract query from URL
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const urlQuery = urlParams.get('q') || '';
    
    if (urlQuery) {
      setQuery(urlQuery);
    } else {
      // Redirect to home if no query
      window.location.href = '/';
    }
  }, [location]);

  if (!query) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--perplexity-dark))]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--perplexity-orange))] mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return <PreviewAnimation query={query} isPreviewMode={false} />;
};
