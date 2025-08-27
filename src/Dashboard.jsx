import { supabase } from './supabaseClient';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './app/components/ui/button';
import { Input } from './app/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './app/components/ui/card';
import { LogOut, PlusCircle, LogIn, Loader } from 'lucide-react';


export default function Dashboard({ session, profile }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [joinCode, setJoinCode] = useState('');

   useEffect(() => {
            document.title = "Dashboard | StoryWeaver AI"
          }, [])

  const createNewRoom = async () => {
    setLoading(true);
    setError('');
    try {
      const accessToken = session.access_token;
      const response = await fetch('http://localhost:8080/api/rooms', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error(`Failed to create room. Status: ${response.status}`);
      const data = await response.json();
      navigate(`/room/${data.code}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    if (!joinCode.trim()) return;
    setLoading(true);
    setError('');
    try {
      const accessToken = session.access_token;
      const response = await fetch(`http://localhost:8080/api/rooms/join/${joinCode.trim().toUpperCase()}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (response.status === 409) throw new Error('This room is full (max 5 members).');
      if (response.status >= 400) throw new Error('Room not found with this code.');
      if (!response.ok) throw new Error(`Failed to join room. Status: ${response.status}`);
      const roomData = await response.json();
      navigate(`/room/${roomData.code}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          Welcome, <span className="text-primary">{profile.username}</span>!
        </h2>
        <Button variant="ghost" onClick={() => supabase.auth.signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create Room Card */}
        <Card className="bg-gray-800/50 border-border/40 hover:border-primary/60 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="text-primary" />
              Create a New Story
            </CardTitle>
            <CardDescription>Start a new collaborative storyboard and invite your friends to weave a tale together.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={createNewRoom} 
              disabled={loading} 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6"
            >
              {loading && !joinCode ? 'Creating...' : 'Create New Room'}
            </Button>
          </CardContent>
        </Card>

        {/* Join Room Card */}
        <Card className="bg-gray-800/50 border-border/40 hover:border-primary/60 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <LogIn className="text-primary"/>
                Join an Existing Story
            </CardTitle>
            <CardDescription>Enter a room code that a friend has shared with you to jump into the action.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoinRoom} className="flex flex-col gap-4">
              <Input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="Enter Room Code..."
                className="bg-gray-800 border-gray-700 placeholder:text-gray-500 text-center font-mono text-lg tracking-widest"
              />
              <Button 
                type="submit" 
                disabled={loading}
                variant="secondary"
                className="w-full font-bold text-lg py-6"
              >
                {loading && joinCode ? 'Joining...' : 'Join Room'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="mt-8 p-4 bg-destructive/20 border border-destructive/50 text-destructive-foreground rounded-lg text-center">
          <p>{error}</p>
        </div>
      )}
    </div>
    </div>
  );
}
