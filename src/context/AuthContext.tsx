import React, { createContext, useState } from 'react';

import { signIn } from '../services/auth.service';

interface AuthContextData {
    token: string;
    loading: boolean;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    handleSignIn(email: string, password: string): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [token, setToken] = useState<string>('');
    const [loading, setLoading] = useState(true);

    async function handleSignIn(email: string, password: string) {
        try {
            const response = await signIn(email, password);
            console.log('authContext');
            console.log(response);
            if (response) {
                localStorage.setItem('picture', response.data.data.profile);
                setToken(response.data.metadata.accessToken);
            } else {
                throw new Error('login failed');
            }
        } catch (error) {
            console.error(error);
            throw new Error('login failed');
        }
        setLoading(false);
    }
    return (
        <AuthContext.Provider
            value={{
                token,
                handleSignIn: handleSignIn,
                setToken,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
