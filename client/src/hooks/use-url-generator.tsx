import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useUrlGenerator = () => {
  const [generatedUrl, setGeneratedUrl] = useState<string>('');
  const [isUrlGenerated, setIsUrlGenerated] = useState(false);
  const { toast } = useToast();

  const generateUrl = useCallback(async (query: string) => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search query first!",
        variant: "destructive",
      });
      return null;
    }

    try {
      const response = await fetch(`/api/generate-url?query=${encodeURIComponent(query.trim())}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate URL');
      }
      
      setGeneratedUrl(data.url);
      setIsUrlGenerated(true);
      return data.url;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate URL. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  }, [toast]);

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
