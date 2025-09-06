import MovieCard from "../components/movies/MovieCard.jsx"
import Button from '../components/ui/Button.jsx'



export default function Profile() {
  const name = "John Doe"
  const email = "johndoe@example.com"

  // Function to get initials from name
  const getInitials = (fullName) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-24 px-6 py-12 p-20">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* User Info */}
        <section className="flex items-center space-x-6">
          {/* Initials Avatar */}
          <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center text-black text-2xl font-bold shadow-lg">
            {getInitials(name)}
          </div>

          {/* Name & Email */}
          <div>
            <h1 className="text-4xl font-bold text-yellow-400">{name}</h1>
            <p className="text-gray-400">{email}</p>
            <div className="mt-4 flex space-x-3">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                Edit Profile
              </Button>
              <Button variant="outline" className="text-white border-gray-500 bg-gray-500 hover:bg-gray-600">
                Change Password
              </Button>
            </div>
          </div>
        </section>

        {/* Liked Movies */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">❤️ Liked Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MovieCard title="Avengers - The Endgame" poster="https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg" />
            <MovieCard title="The Dark Knight" poster="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTfE_qrYMBZ_JB8om-34WGaZARhpX26yWRttqIDvn4_7l--UzX8mxKcPrc59IcvTpEA_G8gPA" />
          </div>
        </section>

        {/* Saved Movies */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">📌 Saved Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MovieCard title="Interstellar" poster="https://m.media-amazon.com/images/I/91kFYg4fX3L._SY679_.jpg" />
            <MovieCard title="Fight Club" poster="https://m.media-amazon.com/images/I/51EG732BV3L.jpg" />
          </div>
        </section>

        {/* Reviews */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">✍️ My Reviews</h2>
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="font-bold text-yellow-300">Inception</h3>
              <p className="text-gray-300 text-sm">⭐⭐⭐⭐⭐ - "Mind-blowing movie, Nolan is a genius!"</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="font-bold text-yellow-300">The Dark Knight</h3>
              <p className="text-gray-300 text-sm">⭐⭐⭐⭐⭐ - "Heath Ledger’s Joker is unmatched."</p>
            </div>
          </div>
        </section>

        {/* Account Actions */}
        <section className="pt-6 border-t border-gray-700 ">
          <div className="flex space-x-4">
            <Button className="bg-gray-500 hover:bg-gray-700">Logout</Button>
            <Button variant="outline" className="text-white border-gray-500 bg-red-600 hover:bg-red-700">
              Delete Account
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}



// function Profile() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white pt-24 px-6">
//       <div className="max-w-5xl mx-auto space-y-12">

//         <section>
//           {/* Initials Avatar */}
//           <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center text-black text-2xl font-bold shadow-lg">
//             {/* {getInitials(name)} */}
//           </div>

//           <h1 className="text-4xl font-bold text-yellow-400">John Doe</h1>
//           <p className="text-gray-400">johndoe@exaaample.com</p>
//           <div className="mt-4 flex space-x-3">
//             <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
//               Edit Profile
//             </Button>
//             <Button variant="outline" className="text-white border-gray-500">
//               Change Password
//             </Button>
//           </div>
//         </section>

//         {/* Liked Movies */}
//         <section>
//           <h2 className="text-2xl font-semibold mb-4">❤️ Liked Movies</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             <MovieCard title="Avengers - The Endgame" poster="https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg" />
//             <MovieCard title="The Dark Knight" poster="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTfE_qrYMBZ_JB8om-34WGaZARhpX26yWRttqIDvn4_7l--UzX8mxKcPrc59IcvTpEA_G8gPA" />
//           </div>
//         </section>

//         {/* Saved Movies */}
//         <section>
//           <h2 className="text-2xl font-semibold mb-4">📌 Saved Movies</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             <MovieCard title="Interstellar" poster="https://m.media-amazon.com/images/I/91kFYg4fX3L._SY679_.jpg" />
//             <MovieCard title="Fight Club" poster="https://m.media-amazon.com/images/I/51EG732BV3L.jpg" />
//           </div>
//         </section>

//         {/* Reviews */}
//         <section>
//           <h2 className="text-2xl font-semibold mb-4">✍️ My Reviews</h2>
//           <div className="space-y-4">
//             <div className="bg-gray-800 p-4 rounded-lg shadow">
//               <h3 className="font-bold text-yellow-300">Inception</h3>
//               <p className="text-gray-300 text-sm">⭐⭐⭐⭐⭐ - "Mind-blowing movie, Nolan is a genius!"</p>
//             </div>
//             <div className="bg-gray-800 p-4 rounded-lg shadow">
//               <h3 className="font-bold text-yellow-300">The Dark Knight</h3>
//               <p className="text-gray-300 text-sm">⭐⭐⭐⭐⭐ - "Heath Ledger’s Joker is unmatched."</p>
//             </div>
//           </div>
//         </section>

//         {/* Account Actions */}
//         <section className="pt-6 border-t border-gray-700">
//           <div className="flex space-x-4">
//             <Button className="bg-red-600 hover:bg-red-700">Logout</Button>
//             <Button variant="outline" className="text-white border-gray-500">
//               Delete Account
//             </Button>
//           </div>
//         </section>
        
//       </div>
//     </div>
//   )
// }

// export default Profile

// import MovieCard from "../components/movies/MovieCard.jsx"
// import { Button } from "../components/ui/Button.jsx"

// export default function Profile() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-24 px-6">
//       <div className="max-w-5xl mx-auto space-y-12">

//         {/* User Info */}
//         <section>
//           <h1 className="text-4xl font-bold text-yellow-400">John Doe</h1>
//           <p className="text-gray-400">johndoe@example.com</p>
//           <div className="mt-4 flex space-x-3">
//             <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
//               Edit Profile
//             </Button>
//             <Button variant="outline" className="text-white border-gray-500">
//               Change Password
//             </Button>
//           </div>
//         </section>

//         {/* Liked Movies */}
//         <section>
//           <h2 className="text-2xl font-semibold mb-4">❤️ Liked Movies</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             <MovieCard title="Inception" poster="https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg" />
//             <MovieCard title="The Dark Knight" poster="https://m.media-amazon.com/images/I/51k0qa6qYUL.jpg" />
//           </div>
//         </section>

//         {/* Saved Movies */}
//         <section>
//           <h2 className="text-2xl font-semibold mb-4">📌 Saved Movies</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             <MovieCard title="Interstellar" poster="https://m.media-amazon.com/images/I/91kFYg4fX3L._SY679_.jpg" />
//             <MovieCard title="Fight Club" poster="https://m.media-amazon.com/images/I/51EG732BV3L.jpg" />
//           </div>
//         </section>

//         {/* Reviews */}
//         <section>
//           <h2 className="text-2xl font-semibold mb-4">✍️ My Reviews</h2>
//           <div className="space-y-4">
//             <div className="bg-gray-800 p-4 rounded-lg shadow">
//               <h3 className="font-bold text-yellow-300">Inception</h3>
//               <p className="text-gray-300 text-sm">⭐⭐⭐⭐⭐ - "Mind-blowing movie, Nolan is a genius!"</p>
//             </div>
//             <div className="bg-gray-800 p-4 rounded-lg shadow">
//               <h3 className="font-bold text-yellow-300">The Dark Knight</h3>
//               <p className="text-gray-300 text-sm">⭐⭐⭐⭐⭐ - "Heath Ledger’s Joker is unmatched."</p>
//             </div>
//           </div>
//         </section>

//         {/* Account Actions */}
//         <section className="pt-6 border-t border-gray-700">
//           <div className="flex space-x-4">
//             <Button className="bg-red-600 hover:bg-red-700">Logout</Button>
//             <Button variant="outline" className="text-white border-gray-500">
//               Delete Account
//             </Button>
//           </div>
//         </section>

//       </div>
//     </div>
//   )
// }
