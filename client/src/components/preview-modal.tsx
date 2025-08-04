import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PreviewAnimation } from '@/components/preview-animation';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
}

export const PreviewModal = ({ isOpen, onClose, query }: PreviewModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-full w-screen h-screen sm:max-w-4xl sm:w-full sm:h-auto p-0 border-0" 
        style={{ backgroundColor: 'var(--background)' }}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Preview Animation</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <PreviewAnimation 
            query={query} 
            redirect={false}
          />
          <div className="p-4 text-center">
            <button 
              onClick={onClose}
              className="clean-btn clean-btn-primary"
            >
              Close Preview
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
