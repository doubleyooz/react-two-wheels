import React, { Suspense, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import AuthContext from '../context/AuthContext';

import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import { refreshToken } from '../services/auth.service';

const Paths: React.FC = () => {
    const { token, setToken } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    const shouldRenderHeader = !['/login', '/signup'].includes(
        location.pathname
    );

    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                try {
                    const result = await refreshToken();
                    if (result) setToken(result.data.metadata.accessToken);
                } catch {}
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <div className="h-screen w-screen">
                {shouldRenderHeader && <Header />}

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Suspense>
    );
};

export default Paths;
