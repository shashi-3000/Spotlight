import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
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
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App