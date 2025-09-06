import React from 'react'
import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-10 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-extrabold text-yellow-400">SPOTLIGHT</h1>
          <p className="mt-2 text-sm">
            Your one-stop movie destination ✨
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-yellow-300 mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/profile" className="hover:text-yellow-400">Profile</Link></li>
            <li><Link to="/movies" className="hover:text-yellow-400">Movies</Link></li>
            <li><Link to="/login" className="hover:text-yellow-400">Login / Signup</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-yellow-300 mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-400">
              <Instagram size={22} />
            </a>
            <a href="#" className="hover:text-yellow-400">
              <Twitter size={22} />
            </a>
            <a href="#" className="hover:text-yellow-400">
              <Youtube size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} SPOTLIGHT. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
