import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Baby {
    name: string;
    birthDate: string;
    progresses: {
        babyId: number;
        flashcardId: number;
        ageInMonths: number;
        category: string;
        achieved: boolean;
        dateAchieved: string;
    }[];
}

interface User {
    username: string;
    email: string;
    role: string[];
    token: string;
    babies: Baby[];
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => {},
    logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        setUser(userData);
        console.log(`Logged in as: ${userData.username}`);
    };

    const logout = () => {
        setUser(null);
        console.log('Logged out');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
