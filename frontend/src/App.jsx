// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";
// import Profile from "./pages/Profile.jsx";
// import MovieDetails from "./pages/MovieDetails.jsx";
// import Layout from "./components/layout/Layout.jsx";
// import './App.css'

// function App() {
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route element={<Layout />}>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/movies" element={<MovieDetails/>}/>
//           </Route>
//         </Routes>
//       </Router>
//     </>
//   )
// }

// export default App

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Recommendation from "./pages/Recommendation.jsx"; // Add this import
import Layout from "./components/layout/Layout.jsx";
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/movies" element={<MovieDetails/>}/>
            <Route path="/recommendations" element={<Recommendation/>}/> {/* Add this route */}
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App