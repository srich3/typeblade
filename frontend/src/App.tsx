import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from './stores/authStore'
import { supabase } from './lib/supabase'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import Game from './pages/Game.tsx'
import Profile from './pages/Profile.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Leaderboard from './pages/Leaderboard.tsx'
import Pricing from './pages/Pricing.tsx'

function App() {
  const { setUser, setSession } = useAuthStore()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [setUser, setSession])

  return (
    <div className="min-h-screen bg-gray-900">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="game" element={<Game />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App 