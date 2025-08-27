import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Button } from './app/components/ui/button';
import { Input } from './app/components/ui/input';
import { Label } from './app/components/ui/label';
import { Sparkles, LogOut } from 'lucide-react';

export default function ProfileSetup({ session, onProfileSetup }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
          document.title = "Create your profile | StoryWeaver AI"
        }, [])

  const handleSetupProfile = async (e) => {
    e.preventDefault();
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const accessToken = session.access_token;
      const response = await fetch('https://storyweaverai-maqh.onrender.com/api/users/me', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error('Failed to set username. It might already be taken.');
      }
      
      // Call the passed-in function to re-check the user's profile state
      onProfileSetup(session); 
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:flex bg-gray-900 text-white">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Looks like you're new here!</h1>
            <p className="text-balance text-gray-400">
              Pick a username to start weaving stories.
            </p>
          </div>
          <form onSubmit={handleSetupProfile}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Your creative name"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800 border-gray-700 placeholder:text-gray-500"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
                {loading ? 'Saving...' : 'Save and Continue'}
              </Button>
            </div>
          </form>
          {error && <p className="mt-4 text-red-400 text-center text-sm">{error}</p>}
          <Button variant="link" onClick={() => supabase.auth.signOut()} className="text-gray-500 text-sm">
             <LogOut className="mr-2 h-4 w-4"/>
             Sign Out
          </Button>
        </div>
      </div>
      
    </div>
  );
}
