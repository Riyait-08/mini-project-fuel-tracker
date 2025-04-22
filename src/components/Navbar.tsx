
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Fuel, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-fuel-green-dark font-bold text-xl">
            <Fuel className="w-6 h-6" />
            <span>FuelWise</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-fuel-blue-dark hover:text-fuel-blue-light transition-colors">
                  Dashboard
                </Link>
                <div className="flex items-center gap-2 text-sm text-fuel-blue-dark">
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1" 
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
