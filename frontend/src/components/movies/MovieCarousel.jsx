
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

export default function MovieCarousel({ title, movies }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 200; // Approximate width of each card + gap
      const scrollAmount = cardWidth * 3; // Scroll 3 cards at a time
      
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-12 relative group">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">{title}</h2>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-yellow-400 p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ top: 'calc(50% + 1rem)' }} // Adjust for title height
      >
        <ChevronLeft size={24} />
      </button>

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth px-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie, index) => (
          <div key={movie.id || index} className="flex-shrink-0">
            {/* <MovieCard title={movie.title} poster={movie.poster} /> */}
            <MovieCard title={movie.title} poster={movie.poster} movie={movie} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-yellow-400 p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ top: 'calc(50% + 1rem)' }} // Adjust for title height
      >
        <ChevronRight size={24} />
      </button>

      {/* Hide scrollbar completely */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}