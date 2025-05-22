// components/Footer.jsx
import { FaInstagram, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-16 text-white px-6 py-12 bg-gradient-to-t from-[#0f0f0f] to-transparent backdrop-blur-xl border-t border-blue-500/30 shadow-2xl">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-start">

        {/* Logo and Tagline */}
        <div>
          <h1 className="text-3xl font-bold text-fuchsia-500 drop-shadow-lg">W-Blogs</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Futuristic insights. Real-time content. Curated by passion.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-blue-400">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-fuchsia-400 transition">Home</a></li>
            <li><a href="/blogs" className="hover:text-fuchsia-400 transition">Blogs</a></li>
            <li><a href="/about" className="hover:text-fuchsia-400 transition">About</a></li>
            <li><a href="/contact" className="hover:text-fuchsia-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-blue-400">Subscribe</h3>
          <p className="text-gray-400 text-sm mb-3">Stay updated with our latest content</p>
          <div className="flex items-center bg-gray-800 rounded-full p-1 border border-gray-700 focus-within:ring-2 focus-within:ring-fuchsia-600">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow bg-transparent text-white px-4 py-2 outline-none text-sm placeholder-gray-400"
            />
            <button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-full transition-all duration-300 font-semibold">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} W-Blogs. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-fuchsia-500 transition"><FaInstagram size={18} /></a>
          <a href="#" className="hover:text-fuchsia-500 transition"><FaTwitter size={18} /></a>
          <a href="#" className="hover:text-fuchsia-500 transition"><FaGithub size={18} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
