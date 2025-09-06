import { Link } from 'react-router-dom';
import oscarBg from "../assets/oscars.jpg";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${oscarBg})` }}
    >
      <div className="absolute inset-0 bg-black/65"></div>

      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-[57px] font-extrabold text-yellow-300 mb-6">
          Welcome to SpotLight 🎬
        </h1>
        <p className="text-lg text-gray-200 mb-8">
          Discover movies, read reviews, and share your thoughts with the world.
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition">
          <Link to={"/movies"}>
            Explore Movies
          </Link>
        </button>
      </div>
    </div>
  );
}