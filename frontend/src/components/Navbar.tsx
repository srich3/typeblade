import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

const Navbar = () => {
  const { user, logout } = useAuthStore()

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gradient">
            TypeBlade
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/game" className="text-gray-300 hover:text-white">
              Play
            </Link>
            <Link to="/leaderboard" className="text-gray-300 hover:text-white">
              Leaderboard
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="text-gray-300 hover:text-white">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="btn-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 