import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button } from './app/components/ui/button';
import { Card, CardContent } from './app/components/ui/card';
import { Badge } from './app/components/ui/badge';
import { Users, Pencil, Sparkles, Zap, Heart, Github, ArrowRight, Play } from 'lucide-react';
import Navbar from './Navbar';
import { motion, transform } from 'motion/react';
import HeroVisual from './HeroVisual';
import {
 Label
} from "./app/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "./app/components/ui/dialog";
import { useEffect } from 'react';

export default function LandingPage() {
  useEffect(() => {
      document.title = "StoryWeaver AI | Collaborative AI Storyboarding"
    }, [])
  return (
    <div className='bg-background min-h-screen'>
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <div className='grid items-center gap-12 lg:grid-cols-2'>
            <div className='space-y-8'>
              <div className='space-y-4'>
                <h1 className='text-foreground text-4xl font-bold text-balance lg:text-6xl'>
                  Create Stories Together, Instantly.
                </h1>
                <p className='text-muted-foreground max-w-2xl text-xl text-pretty'>
                  Go from a simple text prompt to a beautiful, AI-illustrated comic panel in
                  seconds. The ultimate real-time storyboarding tool for you and your friends.
                </p>
              </div>
              <Link to="/signup" >
            <Button size='lg' className='btn-green rounded-xl px-8 py-6 text-lg'>
              Get Started for Free
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            </Link>
            </div>
            <div className='relative flex items-center justify-center'>
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='bg-card/20 py-20'>
        <div className='container mx-auto px-4'>
          <div className='mb-16 text-center'>
            <h2 className='text-foreground mb-4 text-3xl font-bold lg:text-4xl'>How It Works</h2>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
              Three simple steps to create amazing stories with your friends
            </p>
          </div>
          <div className='grid gap-8 md:grid-cols-3'>
            <motion.Card
              initial={{ x: '-100%' }}
              whileInView={{ x: '0%' }}
              transition={{ duration: 0.3 }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.5 },
              }}
              className='bg-card/50 border-border/40 text-center backdrop-blur-sm'
            >
              <CardContent className='p-8'>
                <div className='bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full'>
                  <Users className='text-primary h-8 w-8' />
                </div>
                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Create & Share a Room
                </h3>
                <p className='text-muted-foreground'>
                  Start a new story with one click and get a unique code to invite your friends.
                </p>
              </CardContent>
            </motion.Card>
            <motion.Card
              initial={{ x: '-100%' }}
              whileInView={{ x: '0%' }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.5 },
              }}
              className='bg-card/50 border-border/40 text-center backdrop-blur-sm'
            >
              <CardContent className='p-8'>
                <div className='bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full'>
                  <Pencil className='text-primary h-8 w-8' />
                </div>
                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Write Together, Turn by Turn
                </h3>
                <p className='text-muted-foreground'>
                  Take turns writing prompts. Our AI uses the story's context to generate connected
                  images.
                </p>
              </CardContent>
            </motion.Card>
            <motion.Card
              initial={{ x: '-100%' }}
              whileInView={{ x: '0%' }}
              transition={{ duration: 0.7 }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.5 },
              }}
              className='bg-card/50 border-border/40 text-center backdrop-blur-sm'
            >
              <CardContent className='p-8'>
                <div className='bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full'>
                  <Sparkles className='text-primary h-8 w-8' />
                </div>
                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Watch Your Comic Come to Life
                </h3>
                <p className='text-muted-foreground'>
                  See your storyboard grow in real-time. When you're done, view it in a fun,
                  flippable comic book format.
                </p>
              </CardContent>
            </motion.Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20'>
        <div className='container mx-auto space-y-20 px-4'>
          {/* Feature 1 */}
          <div className='grid items-center gap-12 lg:grid-cols-2'>
            <div className='space-y-6'>
              <Badge variant='secondary' className='bg-primary/10 text-primary border-primary/20'>
                Real-Time Collaboration
              </Badge>
              <h3 className='text-foreground text-3xl font-bold lg:text-4xl'>
                Real-Time Collaboration, Zero Friction.
              </h3>
              <p className='text-muted-foreground text-lg'>
                See new panels appear instantly for everyone in the room. No more screen-sharing or
                sending files back and forth. It's a truly shared creative space.
              </p>
              <div className='text-muted-foreground flex items-center space-x-4 text-sm'>
                <div className='flex items-center space-x-2'>
                  <Zap className='h-4 w-4' />
                  <span>Instant sync</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Users className='h-4 w-4' />
                  <span>Multi-user</span>
                </div>
              </div>
            </div>
            <Card className='bg-card/50 border-border/40 backdrop-blur-sm'>
              <CardContent className='p-8'>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-muted-foreground text-sm'>💻 Desktop</span>
                    <span className='text-muted-foreground text-sm'>📱 Mobile</span>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='bg-muted/30 flex h-32 items-center justify-center rounded-lg p-4'>
                      <div className='text-center'>
                        <div className='mx-auto mb-2 h-2 w-2 rounded-full bg-green-500'></div>
                        <span className='text-muted-foreground text-xs'>Sarah typing...</span>
                      </div>
                    </div>
                    <div className='bg-muted/30 flex h-32 items-center justify-center rounded-lg p-4'>
                      <div className='text-center'>
                        <div className='mx-auto mb-2 h-2 w-2 rounded-full bg-blue-500'></div>
                        <span className='text-muted-foreground text-xs'>Mike viewing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature 2 */}
          <div className='grid items-center gap-12 lg:grid-cols-2'>
            <Card className='bg-card/50 border-border/40 backdrop-blur-sm lg:order-1'>
              <CardContent className='p-8'>
                <div className='flex h-48 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6'>
                  <div className='text-center'>
                    <Sparkles className='text-primary mx-auto mb-4 h-12 w-12' />
                    <p className='text-foreground text-sm font-medium'>
                      "A futuristic city at night, neon signs reflecting in the rain, comic book
                      style"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className='space-y-6 lg:order-2'>
              <Badge variant='secondary' className='bg-primary/10 text-primary border-primary/20'>
                AI-Powered
              </Badge>
              <h3 className='text-foreground text-3xl font-bold lg:text-4xl'>
                No Art Skills Needed.
              </h3>
              <p className='text-muted-foreground text-lg'>
                If you can write a sentence, you can create a beautiful storyboard. Our AI handles
                all the illustration, letting you focus on what matters most: your story.
              </p>
              <div className='text-muted-foreground flex items-center space-x-4 text-sm'>
                <div className='flex items-center space-x-2'>
                  <Heart className='h-4 w-4' />
                  <span>High quality</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Zap className='h-4 w-4' />
                  <span>Lightning fast</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className='bg-card/20 py-20'>
        <div className='container mx-auto px-4 text-center'>
          <div className='mx-auto max-w-2xl space-y-8'>
            <h2 className='text-foreground text-3xl font-bold lg:text-4xl'>
              Ready to Weave Your First Story?
            </h2>
            <p className='text-muted-foreground text-lg'>
              Join thousands of creators bringing their stories to life with AI
            </p>
            <Link to="/signup" >
            <Button size='lg' className='btn-green rounded-xl px-8 py-6 text-lg'>
              Get Started for Free
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-border/40 border-t py-6'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
            <div className='text-muted-foreground flex items-center gap-4 text-sm'>
              {/* The "About" button now triggers the Dialog */}
              <Dialog>
      <DialogTrigger asChild>
        <p className='cursor-pointer'>About</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>About</DialogTitle>
          
        </DialogHeader>
        <div className="text-center p-4">
      {/* Logo Icon */}
      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 mb-4">
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

      {/* App Name */}
      <h2 className="text-2xl font-bold text-foreground">
        StoryWeaver AI
      </h2>
      
      {/* Brief Description */}
      <p className="text-muted-foreground mt-2">
        A real-time, collaborative storyboarding tool.
      </p>

      {/* About Paragraph */}
      <div className="mt-6 text-left text-gray-300 space-y-4">
        <p>
          StoryWeaver AI was built to make visual storytelling fast, fun, and accessible to everyone, regardless of artistic skill. It transforms the slow, traditional process of creating storyboards into a dynamic brainstorming session.
        </p>
        <p>
          Just write a prompt, and our AI will handle the illustration instantly, allowing you to focus on your narrative and bring your story to life, together.
        </p>
        <p className="text-sm text-center pt-4 text-gray-500">
          Made by Karannn3011.
        </p>
      </div>
    </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

              <a
                href='https://github.com/karannn3011/swaibackend' // Link to your actual repo
                target="_blank"
                rel="noopener noreferrer"
                className='hover:text-primary flex items-center gap-1 transition-colors'
              >
                <Github className='h-4 w-4' />
                <span>GitHub</span>
              </a>
            </div>
            <p className='text-muted-foreground text-sm'>
              Created with ❤️ and powered by <a href="https://pollinations.ai/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">Pollinations.ai</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
