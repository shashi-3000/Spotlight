// // src/components/Layout/Navbar.jsx

//this is the logic for ui.........before i added auth part...

// import { Link } from "react-router-dom";
// import Button from "../ui/Button"; // import reusable button

// const Navbar = () => {
//   return (
//     // <nav className="bg-black text-white shadow-md">
//     // <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-black via-black to-[#2e0101] shadow-md">
//     //   <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//     //     {/* Logo */}
//     //     <Link to="/" className="text-3xl font-extrabold text-yellow-400 drop-shadow-[0_0_8px_gold]">
//     //       SPOTLIGHT
//     //     </Link>

//     //     {/* Links */}
//     //     <div className="hidden md:flex space-x-10 text-lg font-medium">
//     //       <Link to="/" className="hover:text-yellow-500 text-yellow-300 transition">Home</Link>
//     //       <Link to="/profile" className="hover:text-yellow-500 text-yellow-300 transition">Profile</Link>
//     //       <Link to="/movies" className="hover:text-yellow-500 text-yellow-300 transition">Movies</Link>
//     //     </div>

//     //     {/* Button */}
//     //     <Link to="/login">
//     //       <Button className="bg-yellow-300 hover:bg-yellow-500 text-black shadow-md">
//     //         Login / Signup
//     //       </Button>
//     //     </Link>
//     //   </div>
//     // </nav>
//     <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black via-black/90 to-black/80">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//         {/* Logo */}
//         <Link 
//           to="/" 
//           className="text-3xl font-extrabold text-yellow-400 drop-shadow-[0_0_8px_gold]"
//         >
//           SPOTLIGHT
//         </Link>

//         {/* Links */}
//         <div className="hidden md:flex space-x-10 text-lg font-medium">
//           <Link 
//             to="/" 
//             className="text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:text-transparent hover:bg-clip-text transition"
//           >
//             Home
//           </Link>
//           <Link 
//             to="/profile" 
//             className="text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:text-transparent hover:bg-clip-text transition"
//           >
//             Profile
//           </Link>
//           <Link 
//             to="/movies" 
//             className="text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:text-transparent hover:bg-clip-text transition"
//           >
//             Movies
//           </Link>
//         </div>

//         {/* Button */}
//         <Link to="/login">
//           <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-full shadow-md">
//             Login / Signup
//           </Button>
//         </Link>
//       </div>
//     </nav>

//   );
// };

// export default Navbar;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Function to check login status
  // const checkLoginStatus = () => {
  //   const token = localStorage.getItem('accessToken');
  //   setIsLoggedIn(!!token);
  // };
  const checkLoginStatus = () => {
    const token = localStorage.getItem('accessToken');
    // console.log('Navbar checking token:', token); // NEW
    console.log('Is logged in will be:', !!token); // NEW
    setIsLoggedIn(!!token);
  };

  // useEffect(() => {
  //   // Check on component mount
  //   checkLoginStatus();
    
  //   // Listen for auth changes
  //   const handleAuthChange = () => checkLoginStatus();
  //   window.addEventListener('authChanged', handleAuthChange);
    
  //   // Cleanup
  //   return () => window.removeEventListener('authChanged', handleAuthChange);
  // }, []);

  useEffect(() => {
    checkLoginStatus();
    
    const handleAuthChange = () => {
      console.log('Auth change event received'); // NEW
      checkLoginStatus();
    };
    
    window.addEventListener('authChanged', handleAuthChange);
    
    return () => window.removeEventListener('authChanged', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  // ... rest of your navbar JSX stays the same


  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black via-black/90 to-black/80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-3xl font-extrabold text-yellow-400 drop-shadow-[0_0_8px_gold]"
        >
          SPOTLIGHT
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-10 text-lg font-medium">
          <Link 
            to="/" 
            className="text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:text-transparent hover:bg-clip-text transition"
          >
            Home
          </Link>
          <Link 
            to="/profile" 
            className="text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:text-transparent hover:bg-clip-text transition"
          >
            Profile
          </Link>
          <Link 
            to="/movies" 
            className="text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:text-transparent hover:bg-clip-text transition"
          >
            Movies
          </Link>
        </div>

        
        {/* Conditional Auth Buttons */}
        {/* {console.log('Rendering navbar, isLoggedIn:', isLoggedIn)} ADD THIS LINE */}
        {isLoggedIn ? (
          // Show logout button when logged in
          <Button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-full shadow-md"
          >
            Logout
          </Button>
        ) : (
          // Show login/signup buttons when not logged in
          <div className="flex space-x-3">
            <Link to="/login">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-full shadow-md">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-transparent border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black text-yellow-400 font-semibold px-5 py-2 rounded-full shadow-md">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;






