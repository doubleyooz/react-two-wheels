import React, { Suspense, useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import AuthContext from '../context/AuthContext';

import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import { refreshToken } from '../services/auth.service';
import Loading from '../shared/Loading';

const Paths: React.FC = () => {
    const { userData, setUserData } = useContext(AuthContext);

    const location = useLocation();

    const shouldRenderHeader = !['/login', '/signup'].includes(
        location.pathname
    );

    useEffect(() => {
        const fetchData = async () => {
            if (!userData.token) {
                try {
                    const response = await refreshToken();
                    console.log(response.data);
                    if (response)
                        setUserData((prevState) => ({
                            ...prevState,
                            _id: response.data.data._id ?? null,
                            token: response.data.metadata.accessToken ?? null,
                        }));
                } catch (err) {
                    console.log(err);
                }
            }
        };
        console.log(userData.token);
        fetchData();
    }, [userData, setUserData]);

    return (
        <Suspense fallback={<Loading />}>
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
