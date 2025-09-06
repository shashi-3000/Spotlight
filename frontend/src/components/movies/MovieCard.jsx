import React from 'react'


// export default function MovieCard({ title, poster }) {
//   return (
//     <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform">
//       <img
//         src={poster}
//         alt={title}
//         className="w-full h-64 object-cover"
//       />
//       <div className="p-3 text-center">
//         <h3 className="text-lg font-semibold text-yellow-300">{title}</h3>
//       </div>
//     </div>
//   )
// }


export default function MovieCard({ title, poster }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer min-w-[180px] w-[180px]">
      <img
        src={poster}
        alt={title}
        className="w-full h-64 object-cover"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image";
        }}
      />
      <div className="p-3 text-center">
        <h3 className="text-sm font-semibold text-yellow-300 truncate" title={title}>
          {title}
        </h3>
      </div>
    </div>
  );
}
