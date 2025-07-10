import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.tsx'

const Layout = () => {
  const location = useLocation()
  const isGameRoute = location.pathname === '/game'

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      {isGameRoute ? (
        <Outlet />
      ) : (
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
      )}
    </div>
  )
}

export default Layout 