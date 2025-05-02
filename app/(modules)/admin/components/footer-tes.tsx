import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-12 flex items-center justify-between px-6 border-t bg-white text-sm text-gray-500">
      <div>© {currentYear} Your Company. All rights reserved.</div>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-gray-900">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-gray-900">
          Terms of Service
        </a>
        <a href="#" className="hover:text-gray-900">
          Contact
        </a>
      </div>
    </footer>
  );
};

export default Footer;
