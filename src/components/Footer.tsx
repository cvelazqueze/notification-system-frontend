import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Notification System. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built using Next.js and Nest.js.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
