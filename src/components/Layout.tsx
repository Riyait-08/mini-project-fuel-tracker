
import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNav = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideNav && <Navbar />}
      <main className="flex-1 container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="bg-fuel-green-dark/5 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-fuel-blue-dark/70">
          <p>© 2025 FuelWise Tracker. All rights reserved.</p>
          <p className="mt-1">Keep your car and wallet happy!</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
