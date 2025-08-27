import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

 const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      
      // ** IMPROVED ERROR HANDLING **
      if (error) {
        // Now you will see the specific reason, e.g., "Password should be at least 6 characters"
        throw error;
      }

      alert('Check your email for the confirmation link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">StoryWeaver AI</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
          <input
            id="email"
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
          <input
            id="password"
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between space-x-4">
          <button onClick={handleLogin} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {loading ? <span>Loading...</span> : <span>Sign In</span>}
          </button>
          <button onClick={handleSignUp} disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {loading ? <span>Loading...</span> : <span>Sign Up</span>}
          </button>
        </div>
      </form>
    </div>
  )
}