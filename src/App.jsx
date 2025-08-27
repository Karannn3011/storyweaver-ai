import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import Dashboard from './Dashboard';
import RoomView from './RoomView';
import ProfileSetup from './ProfileSetup';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import { Loader } from 'lucide-react';

function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = useCallback(async (currentSession) => {
    // This function checks for a profile if a session exists
    if (!currentSession) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const accessToken = currentSession.access_token;
      const response = await fetch('http://localhost:8080/api/users/me', {
          headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      if (response.ok) {
          const profileData = await response.json();
          setProfile(profileData);
      } else {
          setProfile(null);
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
      setProfile(null);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    // This effect handles the initial session check and listens for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      checkUser(session);
    });

    return () => subscription.unsubscribe();
  }, [checkUser]);

  // ** DEBUGGING: See the state right before rendering **
  console.log("App State:", { loading, session: !!session, profile: !!profile });

  // While loading, show a full-screen loading indicator
  if (loading) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center"><Loader className="animate-spin w-12 h-12 text-white" /></div>;
  }
  
  // After loading, use the router
  return (
    <div>
    <Routes>
      {/* Routes for logged-in users */}
      {session ? (
        <>
          {!profile ? (
             <Route path="*" element={<ProfileSetup session={session} onProfileSetup={() => checkUser(session)} />} />
          ) : (
            <>
              <Route path="/room/:roomCode" element={<RoomView session={session} />} />
              <Route path="/dashboard" element={<Dashboard session={session} profile={profile} />} />
              <Route path="/*" element={<Navigate to="/dashboard" replace />} />
            </>
          )}
        </>
      ) : (
        /* Routes for logged-out users */
        <>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
    </div>
  );
}

export default App;