import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ZodiacSign as BaseZodiacSign } from '@shared/schema';

// ✅ On étend le type ZodiacSign pour ajouter les dates
export interface ZodiacSign extends BaseZodiacSign {
  dates?: {
    start: { month: number; day: number };
    end: { month: number; day: number };
  };
}

export interface UserSession {
  name: string;
  birthDate: string;
  gender: string;
  zodiacSign?: ZodiacSign; // ✅ Utilise le type étendu
}

interface UserContextType {
  user: UserSession;
  setUser: (user: UserSession) => void;
  updateUser: (updates: Partial<UserSession>) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'cartomystik_user_session';

const loadUserFromStorage = (): UserSession => {
  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Erreur chargement user:', error);
  }
  return { name: '', birthDate: '', gender: '' };
};

const saveUserToStorage = (user: UserSession) => {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Erreur sauvegarde user:', error);
  }
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserSession>(loadUserFromStorage);

  useEffect(() => {
    if (user.name || user.birthDate || user.gender) {
      saveUserToStorage(user);
    }
  }, [user]);

  const setUser = (newUser: UserSession) => {
    setUserState(newUser);
  };

  const updateUser = (updates: Partial<UserSession>) => {
    setUserState(prev => ({ ...prev, ...updates }));
  };

  const clearUser = () => {
    setUserState({ name: '', birthDate: '', gender: '' });
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser doit être utilisé dans un UserProvider');
  }
  return context;
}