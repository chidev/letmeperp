import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Mail } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

interface SocialSharingProps {
  url: string;
  query: string;
}

export const SocialSharing = ({ url, query }: SocialSharingProps) => {
  const shareText = `Let me Perplexity that for you! "${query}"`;

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailShare = () => {
    const emailUrl = `mailto:?subject=${encodeURIComponent('Let me Perplexity that for you!')}&body=${encodeURIComponent(`Here's your answer: ${url}`)}`;
    window.open(emailUrl);
  };

  return (
    <div className="border-t border-[hsl(var(--perplexity-border))] pt-6">
      <p className="text-sm perplexity-text mb-4 text-center">Share this search:</p>
      <div className="flex justify-center space-x-4">
        <Button
          onClick={handleTwitterShare}
          className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          size="sm"
        >
          <Twitter className="w-5 h-5" />
        </Button>
        <Button
          onClick={handleFacebookShare}
          className="p-3 bg-blue-800 hover:bg-blue-900 rounded-lg transition-colors"
          size="sm"
        >
          <Facebook className="w-5 h-5" />
        </Button>
        <Button
          onClick={handleWhatsAppShare}
          className="p-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          size="sm"
        >
          <SiWhatsapp className="w-5 h-5" />
        </Button>
        <Button
          onClick={handleEmailShare}
          className="p-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          size="sm"
        >
          <Mail className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
