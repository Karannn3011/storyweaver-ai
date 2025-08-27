import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { Button } from './app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './app/components/ui/card';
import { Input } from './app/components/ui/input';
import { Label } from './app/components/ui/label';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import signupvisual from "./images/undraw_digital-artwork_xlmm.svg";
import Navbar from './Navbar';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    } catch (error) {
      toast.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
        document.title = "Signup | StoryWeaver AI"
      }, [])
  return (
    <>
    <Navbar />
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 bg-background">
       <div className="hidden lg:flex items-center justify-center p-8">
         <div className="text-center">
            <img src={signupvisual} alt="Get started today"  className='mx-auto'/>
            <h2 className="text-4xl font-bold my-4">Join StoryWeaver AI</h2>
            <p className="text-lg text-gray-400 max-w-md mx-auto">
                Start creating collaborative, AI-illustrated stories with your friends in seconds.
            </p>
         </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to get started
            </p>
          </div>
          <form onSubmit={handleSignUp}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                    id="password" 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
