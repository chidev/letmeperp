import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Paperclip, Mic, ArrowRight } from 'lucide-react';
import { useUrlGenerator } from '@/hooks/use-url-generator';

interface SearchFormProps {
  onPreview: (query: string) => void;
}

export const SearchForm = ({ onPreview }: SearchFormProps) => {
  const [query, setQuery] = useState('');
  const { generatedUrl, isUrlGenerated, generateUrl, copyToClipboard, reset } = useUrlGenerator();

  const handleCopyUrl = () => {
    const url = generateUrl(query);
    if (url) {
      copyToClipboard(url);
    }
  };

  const handlePreview = () => {
    if (!query.trim()) {
      return;
    }
    onPreview(query);
  };

  const handleReset = () => {
    setQuery('');
    reset();
  };

  return (
    <div className="w-full max-w-2xl perplexity-card rounded-2xl shadow-2xl p-6 md:p-8">
      {/* Search Input Section */}
      <div className="mb-8">
        <label htmlFor="searchQuery" className="block text-sm font-medium perplexity-text mb-3">
          Type a question, click a button.
        </label>
        <div className="relative">
          <Input
            id="searchQuery"
            type="text"
            placeholder="Ask anything. Type @ for mentions and / for shortcuts."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="perplexity-input w-full rounded-xl px-4 py-3 pr-32 text-white placeholder-[hsl(var(--perplexity-text))] focus:ring-2 focus:ring-[hsl(var(--perplexity-orange))] focus:border-transparent transition-all duration-200"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handlePreview();
              }
            }}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <button className="p-1 perplexity-text hover:text-white transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-1 perplexity-text hover:text-white transition-colors">
              <Mic className="w-5 h-5" />
            </button>
            <Button
              variant="perplexity"
              size="sm"
              onClick={handlePreview}
              className="p-2 rounded-lg"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <Button
          variant="perplexity"
          className="flex-1 font-medium py-3 px-6 rounded-xl"
          onClick={handleCopyUrl}
        >
          Copy URL
        </Button>
        <span className="hidden sm:flex items-center justify-center perplexity-text font-medium">or</span>
        <Button
          variant="outline"
          className="flex-1 bg-[hsl(var(--perplexity-dark))] hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl border-[hsl(var(--perplexity-border))]"
          onClick={handlePreview}
        >
          Preview
        </Button>
        <span className="hidden sm:flex items-center justify-center perplexity-text font-medium">or</span>
        <Button
          variant="secondary"
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-xl"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>

      {/* Generated URL Display */}
      {isUrlGenerated && (
        <div className="mb-6 p-4 bg-[hsl(var(--perplexity-dark))] rounded-xl border border-[hsl(var(--perplexity-border))]">
          <p className="text-sm perplexity-text mb-2">Share this Search:</p>
          <div className="flex items-center justify-between bg-black bg-opacity-50 rounded-lg p-3">
            <span className="text-sm text-white truncate mr-3 font-mono">
              {generatedUrl}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard()}
              className="text-[hsl(var(--perplexity-orange))] hover:text-orange-400 transition-colors p-2"
            >
              <Copy className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
