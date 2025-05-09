import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <Link to="/" className="flex items-center">
              <FileText className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">ResumeBuilder</span>
            </Link>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-center text-sm text-gray-500 md:text-right">
              &copy; {currentYear} ResumeBuilder. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:justify-start">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <span className="sr-only">Privacy Policy</span>
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <span className="sr-only">Terms of Service</span>
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <span className="sr-only">Contact Us</span>
              Contact Us
            </a>
          </div>
          
          <div className="mt-4 flex items-center justify-center md:mt-0">
            <p className="text-sm text-gray-500 flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by ResumeBuilder Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;