
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the shape of the user object
interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin' | 'hod' | 'staff' | 'parent';
}

// Define the shape of the context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isClassTeacherAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  classTeacherLogin: (username: string, password: string) => Promise<boolean>;
  classTeacherLogout: () => void;
  loading: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [classTeacherToken, setClassTeacherToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      const storedClassTeacherToken = sessionStorage.getItem('classTeacherToken');
      if (storedClassTeacherToken) {
        setClassTeacherToken(storedClassTeacherToken);
      }
    } catch (error) {
      console.error("Failed to parse user from storage", error);
      localStorage.removeItem('user');
      sessionStorage.removeItem('classTeacherToken');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost/php/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.data && data.data.id) {
            const userData: User = data.data;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setClassTeacherToken(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('classTeacherToken');
    window.location.href = '/login';
  };

  const classTeacherLogin = async (username: string, password: string): Promise<boolean> => {
    try {
        // IMPORTANT: We will create this API endpoint in the next step.
        const response = await fetch('http://localhost/php/api/auth/class_teacher_login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, teacher_id: user?.id }), // Pass teacher_id for server-side validation
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success && data.token) {
                setClassTeacherToken(data.token);
                sessionStorage.setItem('classTeacherToken', data.token);
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error('Class Teacher login error:', error);
        return false;
    }
  };

  const classTeacherLogout = () => {
    setClassTeacherToken(null);
    sessionStorage.removeItem('classTeacherToken');
    window.location.href = '/teacher/my-class'; // Redirect to the login gate
  };

  const isAuthenticated = !!user;
  const isClassTeacherAuthenticated = !!classTeacherToken;

  return (
    <AuthContext.Provider value={{
      user, 
      isAuthenticated, 
      isClassTeacherAuthenticated, 
      setUser, 
      login, 
      logout, 
      classTeacherLogin,
      classTeacherLogout,
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for using the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
