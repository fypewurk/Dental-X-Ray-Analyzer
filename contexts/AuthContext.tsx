
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, UserRole, PatientProfile } from '../types.ts'; 

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, pass: string, roleAttempt: UserRole) => Promise<void>; 
  signup: (name: string, email: string, pass: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (details: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    // DB Integration Comment: Replace localStorage with an API call to fetch current user session/data
    try {
      const storedUserString = localStorage.getItem('currentUser');
      if (storedUserString) {
        const storedUser = JSON.parse(storedUserString) as User;
        if (!storedUser.role) {
          storedUser.role = 'patient'; 
        }
        if (storedUser.role === 'dentist' && storedUser.patients === undefined) {
          storedUser.patients = [];
        }
        setCurrentUser(storedUser);
      }
    } catch (error) {
        console.error("Error reading user from local storage during initial load:", error);
        // DB Integration Comment: Handle API call failure gracefully
        localStorage.removeItem('currentUser'); 
        setCurrentUser(null);
    }
    setIsLoading(false);
  }, []);

  const attemptSetStorage = (user: User) => {
    // DB Integration Comment: Replace localStorage with an API call to update/store user session/data
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (storageError: any) {
      console.error("Error saving user to localStorage:", storageError);
      throw new Error(`Failed to save your session: ${storageError.message}. Please ensure your browser allows site data/cookies and has space.`);
    }
  };

  const login = async (email: string, _pass: string, roleAttempt: UserRole): Promise<void> => {
    setIsLoading(true);
    try {
      // DB Integration Comment: Replace setTimeout and localStorage logic with an API call to your backend for authentication.
      // The backend would verify credentials against a database.
      await new Promise(resolve => setTimeout(resolve, 500)); 
      
      let userToLogin: User | null = null;
      // DB Integration Comment: 'allUsers_demo' simulates a user database. Replace with actual DB query.
      const allUsersString = localStorage.getItem('allUsers_demo'); 
      const allUsers: User[] = allUsersString ? JSON.parse(allUsersString) : [];
      
      const foundUser = allUsers.find(u => u.email === email);

      if (foundUser) {
        if (foundUser.role !== roleAttempt) {
          throw new Error(`This email is registered as a ${foundUser.role}. Please login as ${foundUser.role}.`);
        }
        userToLogin = foundUser;
      } else {
        console.warn(`Login attempt for non-existent email "${email}" with role "${roleAttempt}". Creating mock user for demo.`);
        userToLogin = { 
          id: Date.now().toString(), 
          name: email.split('@')[0] || `Demo ${roleAttempt.charAt(0).toUpperCase() + roleAttempt.slice(1)}`, 
          email,
          role: roleAttempt, 
          patients: roleAttempt === 'dentist' ? [] : undefined 
        };
        // DB Integration Comment: This simulates adding a new user to the database if not found (for demo purposes).
        allUsers.push(userToLogin);
        localStorage.setItem('allUsers_demo', JSON.stringify(allUsers));
      }
      
      if (userToLogin.role === 'dentist' && userToLogin.patients === undefined) {
        userToLogin.patients = [];
      } else if (userToLogin.role === 'patient') {
        userToLogin.patients = undefined;
      }
      
      attemptSetStorage(userToLogin); // This would become part of successful API response handling
      setCurrentUser(userToLogin);

    } catch (error: any) {
      console.error("Error during login:", error);
      throw error; 
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, _pass: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    try {
      // DB Integration Comment: Replace with an API call to your backend to register a new user.
      // The backend would typically hash the password and store user details in a database.
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // DB Integration Comment: 'allUsers_demo' simulates a user database check for existing email.
      const allUsersString = localStorage.getItem('allUsers_demo');
      const allUsers: User[] = allUsersString ? JSON.parse(allUsersString) : [];
      if (allUsers.find(u => u.email === email)) {
        throw new Error("An account with this email already exists. Please login.");
      }

      if (name && email.includes('@')) {
          const newUser: User = { 
              id: Date.now().toString(), 
              name, 
              email, 
              role, 
              patients: role === 'dentist' ? [] : undefined 
          };
          // DB Integration Comment: This simulates adding the new user to the database.
          allUsers.push(newUser);
          localStorage.setItem('allUsers_demo', JSON.stringify(allUsers));
          
          attemptSetStorage(newUser); // This simulates creating a session for the new user.
          setCurrentUser(newUser);
      } else {
          throw new Error("Invalid signup details provided (demo).");
      }
    } catch (error: any) {
        console.error("Error during signup:", error);
        throw error;
    } finally {
        setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    const userIdForCleanup = currentUser?.id; 
    // DB Integration Comment: Replace with an API call to your backend to invalidate the user's session (e.g., clear session cookie/token).
    await new Promise(resolve => setTimeout(resolve, 300));
    try {
      localStorage.removeItem('currentUser');
      // DB Integration Comment: Client-side cleanup of related items. Could also be handled by backend session invalidation.
      if (userIdForCleanup) {
        try { localStorage.removeItem(`dentalyze_selected_patient_${userIdForCleanup}`); } catch (e) { console.warn(`Could not remove selected_patient for ${userIdForCleanup}`, e); }
        try { localStorage.removeItem(`dentalyze_branding_prompt_dismissed_${userIdForCleanup}`); } catch (e) { console.warn(`Could not remove branding_prompt_dismissed for ${userIdForCleanup}`, e); }
      }
    } catch (error) {
      console.error("Error removing 'currentUser' from localStorage during logout:", error);
    }
    setCurrentUser(null);
    setIsLoading(false);
  };

  const updateUserProfile = async (details: Partial<User>): Promise<void> => {
    if (!currentUser) {
      throw new Error("No user logged in to update profile.");
    }
    setIsLoading(true);
    try {
      // DB Integration Comment: Replace with an API call to your backend to update user profile data in the database.
      await new Promise(resolve => setTimeout(resolve, 300)); 
      
      let updatedUser = { ...currentUser, ...details };
      
      if (details.patients && currentUser.role === 'dentist') {
        // DB Integration Comment: Patient list updates would be part of the user profile update API call.
        updatedUser.patients = details.patients as PatientProfile[];
      } else if (currentUser.role === 'dentist' && updatedUser.patients === undefined) {
        updatedUser.patients = currentUser.patients || [];
      } else if (updatedUser.role !== 'dentist') {
        updatedUser.patients = undefined;
      }

      attemptSetStorage(updatedUser); // Simulates session update after successful DB update.
      setCurrentUser(updatedUser);

      // DB Integration Comment: Update in "allUsers_demo" (mock DB) for consistency.
      const allUsersString = localStorage.getItem('allUsers_demo');
      let allUsers: User[] = allUsersString ? JSON.parse(allUsersString) : [];
      const userIndex = allUsers.findIndex(u => u.id === updatedUser.id);
      if (userIndex !== -1) {
        allUsers[userIndex] = updatedUser;
      } else {
        allUsers.push(updatedUser); 
      }
      localStorage.setItem('allUsers_demo', JSON.stringify(allUsers));

    } catch (error: any) {
      console.error("Error updating profile:", error);
      throw error; 
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentUser,
    isLoading,
    login,
    signup,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
