import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-20">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-14">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Scholar<span className="text-accent">Stream</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Empowering students worldwide with verified scholarships from
              top-ranked universities. Unlock global academic opportunities with
              ease.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-blue-400 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaLinkedinIn />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-accent transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-scholarships"
                  className="hover:text-accent transition"
                >
                  All Scholarships
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-accent transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Scholarship Categories
            </h3>
            <ul className="space-y-3 text-sm">
              <li>Full Fund</li>
              <li>Partial Fund</li>
              <li>Self Fund</li>
              <li>PhD Opportunities</li>
              <li>Masters Programs</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Email: support@scholarstream.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Location: Global Education Network</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ScholarStream. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
