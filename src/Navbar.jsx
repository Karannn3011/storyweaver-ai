import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from './app/components/ui/button'; // Assuming shadcn/ui Button

export default function Navbar() {
  return (
    <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-gray-900/75">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sparkleGradient" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#A78BFA"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>

  <path d="M15 85 C 10 85, 10 75, 15 75 L 15 25 C 10 25, 10 15, 15 15 L 85 15 C 90 15, 90 25, 85 25 L 85 75 C 90 75, 90 85, 85 85 Z" fill="#374151"/>

  <path d="M50 20 V 80 C 40 80, 30 80, 20 80 V 20 H 50 Z" fill="#E5E7EB"/>
  <path d="M28 35 H 42" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/>
  <path d="M28 45 H 42" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/>
  <path d="M28 55 H 42" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/>
  <path d="M28 65 H 38" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/>

  <path d="M50 20 V 80 C 60 80, 70 80, 80 80 V 20 H 50 Z" fill="#E5E7EB"/>

  <g transform="translate(65, 30) rotate(15)">
    <path d="M0 -12 L 5 0 L 0 12 L -5 0 Z" fill="url(#sparkleGradient)"/>
    <path d="M-12 0 L 0 5 L 12 0 L 0 -5 Z" fill="url(#sparkleGradient)"/>
  </g>
  
  <circle cx="82" cy="38" r="1.5" fill="#8B5CF6"/>
  <rect x="78" y="25" width="3" height="3" rx="1.5" fill="#A78BFA"/>
  <circle cx="85" cy="22" r="1" fill="#8B5CF6"/>
</svg>
          </div>
          <h1 className="text-xl font-bold text-foreground">StoryWeaver AI</h1>
        </Link>
        
        <div className="flex items-center space-x-2">
          <Link to="/login">
            <Button variant="ghost" className="cursor-pointer">Login</Button>
          </Link>
          {/* Update the link to point to the new signup page */}
          <Link to="/signup">
            <Button className="cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
