import { Link } from "react-router";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content mt-20 border-t border-base-200">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-14">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-base-content">
              Scholar<span className="text-accent">Stream</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-base-content/60">
              Empowering students worldwide with verified scholarships from
              top-ranked universities. Unlock global academic opportunities with
              ease.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/programmingHero"
                className="hover:text-accent transition text-base-content/70"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/ProgrammingHero"
                className="hover:text-accent transition text-base-content/70"
              >
                <FaXTwitter />
              </a>
              <a
                href="www.linkedin.com/in/contact-ridoy-hossain"
                className="hover:text-accent transition text-base-content/70"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com/programminghero/"
                className="hover:text-accent transition text-base-content/70"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base-content font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-base-content/70">
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
            <h3 className="text-base-content font-semibold mb-4">
              Scholarship Categories
            </h3>
            <ul className="space-y-3 text-sm text-base-content/70">
              <li>Full Fund</li>
              <li>Partial Fund</li>
              <li>Self Fund</li>
              <li>PhD Opportunities</li>
              <li>Masters Programs</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base-content font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-base-content/60">
              <li>Email: support@scholarstream.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Location: Global Education Network</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-base-200 mt-12 pt-6 text-center text-sm text-base-content/50">
          © {new Date().getFullYear()} ScholarStream. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
