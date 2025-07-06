import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gradient mb-6">
        Welcome to TypeBlade
      </h1>
      <p className="text-xl text-gray-300 mb-8">
        Master typing with rhythm-based practice games
      </p>
      <Link to="/game" className="btn-primary text-lg px-8 py-3">
        Start Typing
      </Link>
    </div>
  )
}

export default Home 