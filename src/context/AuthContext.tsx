import React, { createContext, useState } from 'react';

import { findOneUser, signIn } from '../services/auth.service';

export interface AuthUserContext {
    userData: UserData;
    loading: boolean;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
    signIn(email: string, password: string): Promise<void>;
}

export interface UserData {
    token: string | null;
    email: string | null;
    _id: string | null;
    picture: string | null;
    name: string | null;
}

const AuthContext = createContext<AuthUserContext>({} as AuthUserContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [userData, setUserData] = useState<UserData>({
        name: null,
        token: null,
        email: null,
        _id: null,
        picture: null,
    });
    const [loading, setLoading] = useState<boolean>(true);

    async function handleSignIn(email: string, password: string) {
        try {
            const authResponse = await signIn(email, password);

            console.log(authResponse);
            if (authResponse) {
                setUserData((prevState) => ({
                    ...prevState,
                    _id: authResponse.data.data._id,
                    token: authResponse.data.metadata.accessToken,
                }));
            } else throw new Error('Login failed');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const contextValue: AuthUserContext = {
        setUserData,
        signIn: handleSignIn,
        userData,
        loading,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
