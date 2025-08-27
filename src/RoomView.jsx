import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';
import ComicView from './ComicView';
import { Button } from './app/components/ui/button';
import { Input } from './app/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './app/components/ui/card';
import { ArrowLeft, BookOpen, Clipboard, Users, Send, FileText, Loader} from 'lucide-react';
import { toast } from 'sonner';


export default function RoomView({ session }) {
  const navigate = useNavigate();
  const { roomCode } = useParams();
  const [showComicView, setShowComicView] = useState(false);
  const [room, setRoom] = useState(null);
  const [panels, setPanels] = useState([]);
  const [members, setMembers] = useState({});
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [prompt, setPrompt] = useState('');
  useEffect(() => {
    document.title = "Loading Room... | StoryWeaver AI";
    if (roomCode) {
      document.title = `Room: ${roomCode.toUpperCase()} | StoryWeaver AI`;
    }
  }, [roomCode]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(room.code);
    toast("Room code copied to clipboard!");
  };

  useEffect(() => {
    if (!session || !roomCode) return;

    const fetchData = async () => {
      try {
        const accessToken = session.access_token;
        const roomJoinResponse = await fetch(`https://storyweaverai-maqh.onrender.com/api/rooms/join/${roomCode}`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        if (!roomJoinResponse.ok) throw new Error('Could not find or join this room.');
        const roomData = await roomJoinResponse.json();
        setRoom(roomData);
        const roomId = roomData.id;

        const [panelsResponse, membersResponse] = await Promise.all([
          fetch(`https://storyweaverai-maqh.onrender.com/api/panels/room/${roomId}`, { headers: { 'Authorization': `Bearer ${accessToken}` } }),
          fetch(`https://storyweaverai-maqh.onrender.com/api/rooms/${roomId}`, { headers: { 'Authorization': `Bearer ${accessToken}` } })
        ]);

        if (!panelsResponse.ok) throw new Error('Failed to fetch panels.');
        if (!membersResponse.ok) throw new Error('Failed to fetch room members.');

        const panelsData = await panelsResponse.json();
        const roomStateData = await membersResponse.json();
        setPanels(panelsData);
        
        if (roomStateData.members && roomStateData.members.length > 0) {
          const profilesResponse = await fetch('https://storyweaverai-maqh.onrender.com/api/users/profiles', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(roomStateData.members),
          });
          if (profilesResponse.ok) {
            const profilesData = await profilesResponse.json();
            const membersMap = profilesData.reduce((acc, p) => ({ ...acc, [p.id]: p.username }), {});
            setMembers(membersMap);
          }
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const channel = supabase.channel(`room-updates:${roomCode}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'panels', filter: `room_id=eq.${room?.id}` }, () => fetchData())
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rooms', filter: `code=eq.${roomCode}` }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomCode, session]);

  const handleCreatePanel = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || !room) return;

    setIsCreating(true);
    setError('');
    try {
      const accessToken = session.access_token;
      const response = await fetch(`https://storyweaverai-maqh.onrender.com/api/panels`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, roomId: room.id }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to create panel. Status: ${response.status}. Message: ${errorBody}`);
      }
      setPrompt('');
    } catch (e) {
      setError(e.message);
    } finally {
      setIsCreating(false);
    }
  };

  const isMyTurn = room && room.currentTurnUserId === session.user.id;
  const storySoFar = panels.map(panel => panel.prompt).join('. ');

  if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center"><Loader className="animate-spin w-12 h-12 text-white" /></div>;
  if (error) {
    toast("Error found")
  }

  return (
    <>
      <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
        <header className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
            <div>
                <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-2">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Button>
                <div className="flex items-center gap-2">
                    <p className="text-gray-400">Room Code:</p>
                    <div className="flex items-center gap-2 p-2 bg-gray-800/50 border border-border/40 rounded-md">
                        <span className="text-xl font-mono text-primary tracking-widest">{room.code}</span>
                        <Button variant="ghost" size="icon" onClick={handleCopyCode}>
                            <Clipboard className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
            {panels.length > 0 && (
                <Button onClick={() => setShowComicView(true)} className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-6 px-8">
                    <BookOpen className="mr-2 h-5 w-5" />
                    View as Comic
                </Button>
            )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ----- Main Content Column ----- */}
          <main className="lg:col-span-2">
            <form onSubmit={handleCreatePanel} className="mb-8 flex gap-2 md:gap-4">
              <Input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A knight enters a dark cave..."
                className="flex-grow bg-gray-800 border-gray-700 placeholder:text-gray-500 text-lg py-6"
                disabled={!isMyTurn || isCreating}
              />
              <Button type="submit" disabled={!isMyTurn || isCreating} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 px-6">
                <Send className="h-5 w-5" />
              </Button>
            </form>
            
            {error && <div className="my-4 p-4 bg-destructive/20 text-destructive-foreground rounded-lg"><p>{error}</p></div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {panels.map((panel) => (
                <Card key={panel.id} className="bg-gray-800/50 border-border/40 overflow-hidden group">
                  <div className="aspect-square overflow-hidden">
                    <img src={panel.imageUrl} alt={panel.prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-gray-300">"{panel.prompt}"</p>
                    <p className="text-xs text-gray-500 mt-2">By: <span className="font-semibold text-primary">{members[panel.authorId] || '...'}</span></p>
                  </CardContent>
                </Card>
              ))}
              {isCreating && (
                <Card className="bg-gray-800/50 border-border/40 flex flex-col items-center justify-center p-4 aspect-square">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                  <p className="mt-4 text-gray-400">Generating Panel...</p>
                </Card>
              )}
              {panels.length === 0 && !isCreating && (
                <div className="col-span-full text-center text-gray-500 py-16">
                  <h3 className="text-2xl font-semibold">This story is just beginning!</h3>
                  <p className="mt-2 text-lg">{isMyTurn ? "It's your turn to create the first panel." : "Waiting for the story to start..."}</p>
                </div>
              )}
            </div>
          </main>

          {/* ----- Sidebar Column ----- */}
          <aside className="lg:col-span-1 flex flex-col gap-8">
            {room && (
              <Card className="bg-gray-800/50 border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="text-primary"/>
                    Players in Room
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-wrap gap-4">
                    {Object.keys(members).map(memberId => (
                      <li key={memberId} className={`p-2 rounded-lg transition-all ${room.currentTurnUserId === memberId ? 'bg-green-500/20 border-green-500 border' : 'bg-gray-700/50 border-transparent border'}`}>
                        <span className="font-semibold">{members[memberId]}</span>
                        {session.user.id === memberId && <span className="text-xs font-bold text-primary"> (You)</span>}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-4 font-bold text-xl ${isMyTurn ? 'text-green-400' : 'text-gray-400'}`}>
                    {isMyTurn ? "It's your turn to write!" : "Waiting for another player..."}
                  </p>
                </CardContent>
              </Card>
            )}
            {panels.length > 0 && (
                <Card className="bg-gray-800/50 border-border/40">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="text-primary"/>
                            The Story So Far...
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-300 italic">{storySoFar}</p>
                    </CardContent>
                </Card>
            )}
          </aside>
        </div>
      </div>
      {showComicView && (
        <ComicView panels={panels} onClose={() => setShowComicView(false)} />
      )}
    </>
  );
}
