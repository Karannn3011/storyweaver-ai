import { useState, useEffect } from 'react';
import { Button } from './app/components/ui/button';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

export default function ComicView({ panels, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);

  // Add keyboard navigation for a better desktop experience
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        goToNext();
      } else if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [panels, currentPage]); // Re-bind when panels or page change

  if (!panels || panels.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        <p className="text-white">This story has no panels yet.</p>
        <Button onClick={onClose} variant="ghost" size="icon" className="absolute top-4 right-4 text-white">
            <X className="h-8 w-8" />
        </Button>
      </div>
    );
  }

  const currentPanel = panels[currentPage];

  const goToNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, panels.length - 1));
  };

  const goToPrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-50 animate-fade-in"
        onClick={onClose} // Allow closing by clicking the background
    >
      <Button onClick={onClose} variant="ghost" size="icon" className="absolute top-4 right-4 text-white h-12 w-12">
        <X className="h-8 w-8" />
      </Button>
      
      {/* Main Content Area - Stop propagation to prevent closing when clicking content */}
      <div 
        className="relative w-full max-w-4xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-square max-h-[70vh] flex items-center justify-center">
          {currentPanel && (
            <img 
              src={currentPanel.imageUrl} 
              alt={currentPanel.prompt} 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border-4 border-gray-700/50"
            />
          )}

           {/* Desktop Navigation Arrows */}
            <Button 
                onClick={goToPrevious} 
                disabled={currentPage === 0}
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-16 text-white hidden md:flex disabled:opacity-20"
            >
                <ArrowLeft className="h-10 w-10" />
            </Button>
            <Button 
                onClick={goToNext} 
                disabled={currentPage === panels.length - 1}
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 h-16 w-16 text-white hidden md:flex disabled:opacity-20"
            >
                <ArrowRight className="h-10 w-10" />
            </Button>
        </div>

        {/* Panel Info & Mobile Navigation */}
        <div className="w-full max-w-2xl mt-4 text-center text-white">
          <p className="italic text-gray-300">"{currentPanel.prompt}"</p>
          <div className="flex items-center justify-between mt-4 md:hidden">
            <Button 
              onClick={goToPrevious} 
              disabled={currentPage === 0}
              className="px-6 py-2 bg-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </Button>
            <span className="font-bold">{currentPage + 1} / {panels.length}</span>
            <Button 
              onClick={goToNext} 
              disabled={currentPage === panels.length - 1}
              className="px-6 py-2 bg-gray-700 rounded disabled:opacity-50"
            >
              Next
            </Button>
          </div>
           <div className="hidden md:block mt-4">
             <span className="font-bold">{currentPage + 1} / {panels.length}</span>
           </div>
        </div>
      </div>
    </div>
  );
}
