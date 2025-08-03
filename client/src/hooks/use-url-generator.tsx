import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useUrlGenerator = () => {
  const [generatedUrl, setGeneratedUrl] = useState<string>('');
  const [isUrlGenerated, setIsUrlGenerated] = useState(false);
  const [hostUrl, setHostUrl] = useState<string>('');
  const { toast } = useToast();

  // Fetch the configured host URL once on mount
  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setHostUrl(data.hostUrl))
      .catch(() => setHostUrl(window.location.origin));
  }, []);

  const generateUrl = useCallback((query: string) => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search query first!",
        variant: "destructive",
      });
      return null;
    }

    const encodedQuery = encodeURIComponent(query.trim());
    const baseUrl = hostUrl || window.location.origin;
    const url = `${baseUrl}/?q=${encodedQuery}`;
    
    setGeneratedUrl(url);
    setIsUrlGenerated(true);
    return url;
  }, [toast, hostUrl]);

  const copyToClipboard = useCallback(async (url?: string) => {
    const urlToCopy = url || generatedUrl;
    if (!urlToCopy) return;

    try {
      await navigator.clipboard.writeText(urlToCopy);
      toast({
        title: "Success!",
        description: "URL copied to clipboard!",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: `Please copy manually: ${urlToCopy}`,
        variant: "destructive",
      });
    }
  }, [generatedUrl, toast]);

  const reset = useCallback(() => {
    setGeneratedUrl('');
    setIsUrlGenerated(false);
  }, []);

  return {
    generatedUrl,
    isUrlGenerated,
    generateUrl,
    copyToClipboard,
    reset,
  };
};
