import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { Button } from './app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './app/components/ui/card';
import { Input } from './app/components/ui/input';
import { Label } from './app/components/ui/label';
import { Sparkles } from 'lucide-react';
import loginvisual from "./images/undraw_collaborative-writing_ir40.svg"
import Navbar from './Navbar';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | StoryWeaver AI"
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // On successful login, the onAuthStateChange in App.jsx will handle navigation.
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 bg-gray-900 text-white">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-gray-400">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleLogin}>
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
                  className="bg-gray-800 border-gray-700 placeholder:text-gray-500"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="underline hover:text-primary">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center p-8 bg-background">
         <div className="text-center">
            <img src={loginvisual} alt="Welcome back!"  className='mx-auto'/>
            <h2 className="text-4xl font-bold my-4 ">Welcome Back to StoryWeaver AI</h2>
            <p className="text-lg text-gray-400 max-w-sm mx-auto">
                Your collaborative stories are waiting for you. Let's continue where you left off.
            </p>
         </div>
      </div>
    </div>
    </>
  );
}
