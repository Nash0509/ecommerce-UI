import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../Styles/footer.css";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/4 mb-8 sm:mb-0">
            <h2 className="text-xl font-bold mb-4">BuyNest</h2>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-gray-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-gray-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="w-full sm:w-1/4 mb-8 sm:mb-0">
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <ul className="space-y-3">
              <li>
                <a href="/electronics" className="hover:text-gray-400">
                  Electronics
                </a>
              </li>
              <li>
                <a href="/clothing" className="hover:text-gray-400">
                  Clothing
                </a>
              </li>
              <li>
                <a href="/sports" className="hover:text-gray-400">
                  Sports
                </a>
              </li>
              <li>
                <a href="/luxury" className="hover:text-gray-400">
                  Luxury
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/4">
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <ul className="space-y-3">
              <li>
                <a href="/electronics" className="hover:text-gray-400">
                  Instagram
                </a>
              </li>
              <li>
                <a href="/clothing" className="hover:text-gray-400">
                  Facebook
                </a>
              </li>
              <li>
                <a href="/sports" className="hover:text-gray-400">
                  Twitter
                </a>
              </li>
              <li>
                <a href="/luxury" className="hover:text-gray-400">
                  Youtube
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-full sm:w-1/4 mb-8 sm:mb-0">
            <h2 className="text-xl font-bold mb-4">Support</h2>
            <ul className="space-y-3">
              <li>
                <a href="/faq" className="hover:text-gray-400">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-gray-400">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-gray-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          <p>&copy; 2024 Your BuyNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
