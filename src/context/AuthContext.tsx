
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, AuthState, User } from '@/lib/types';
import { authService } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const { toast } = useToast();

  // Check if user is already logged in (token in localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // In a real app, we would verify the token with the backend
          // For now, we'll just simulate a logged-in user
          setState({
            user: { id: '1', name: 'Demo User', email: 'user@example.com' },
            token,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          console.error('Auth error:', error);
          setState({ ...initialState, isLoading: false });
        }
      } else {
        setState({ ...initialState, isLoading: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const { user, token } = await authService.login(email, password);
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false
      });
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
    } catch (error) {
      console.error('Login error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const { user, token } = await authService.register(name, email, password);
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false
      });
      toast({
        title: "Registration Successful",
        description: `Welcome, ${name}!`,
      });
    } catch (error) {
      console.error('Register error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      toast({
        title: "Registration Failed",
        description: "Please try again with a different email.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
