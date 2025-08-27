import { useState, useEffect } from 'react';
import { Card, CardContent } from './app/components/ui/card';
import { Play } from 'lucide-react';
import visualimg from "./images/visualimg.jpg"

const fullPrompt = "A mysterious wizard casting spells in a moonlit forest...";
const typingSpeed = 50; // Milliseconds per character
const generationTime = 3000; // 3 seconds

export default function HeroVisual() {
  const [displayedPrompt, setDisplayedPrompt] = useState('');
  const [animationState, setAnimationState] = useState('typing'); // 'typing', 'generating', 'done'

  useEffect(() => {
    // Phase 1: Typing Animation
    if (animationState === 'typing') {
      const typingInterval = setInterval(() => {
        setDisplayedPrompt((prev) => {
          if (prev.length < fullPrompt.length) {
            return fullPrompt.substring(0, prev.length + 1);
          } else {
            // When typing is done, clear the interval and move to the next state
            clearInterval(typingInterval);
            setAnimationState('generating');
            return prev;
          }
        });
      }, typingSpeed);

      return () => clearInterval(typingInterval); // Cleanup on unmount
    }

    // Phase 2: Generation Spinner
    if (animationState === 'generating') {
      const generationTimer = setTimeout(() => {
        // After the generation time, move to the final state
        setAnimationState('done');
      }, generationTime);

      return () => clearTimeout(generationTimer); // Cleanup on unmount
    }
  }, [animationState]); // This effect re-runs whenever the animationState changes

  return (
    <Card className='bg-gray-800/50 border-gray-700/50 backdrop-blur-sm w-full max-w-lg'>
      <CardContent className='p-6 md:p-8'>
        <div className='space-y-6'>
          <div className='flex items-center space-x-3'>
            <div className='h-3 w-3 animate-pulse rounded-full bg-green-500'></div>
            <span className='text-gray-400 text-sm'>Live generation preview</span>
          </div>
          <div className='space-y-4'>
            {/* Prompt text with typing effect */}
            <div className='bg-gray-700/50 rounded-lg p-4 min-h-[60px]'>
              <p className='text-white text-sm'>
                "{displayedPrompt}"
                {/* Show the blinking cursor only during the typing phase */}
                {animationState === 'typing' && (
                  <span className="inline-block w-2 h-4 bg-white animate-pulse ml-1"></span>
                )}
              </p>
            </div>

            {/* The panel that shows the generation process */}
            <div className='bg-purple-500/10 border-purple-500/20 rounded-lg border p-4'>
              <div className='flex h-46  items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20'>
                {animationState === 'generating' && (
                  <div className="animate-fade-in text-center flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-purple-400 mx-auto"></div>
                    
                  </div>
                )}
                {animationState === 'done' && (
                  <img src={visualimg} alt="A wizard..." className=' h-46 rounded-lg w-full'/>
                )}
              </div>
              <p className='text-gray-500 mt-2 text-xs'>
                AI-generated comic panel
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}