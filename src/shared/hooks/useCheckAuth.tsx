import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext, { AuthUserContext } from '../../context/AuthContext';

const useCheckAuth = (): string | null => {
    const { userData } = useContext<AuthUserContext>(AuthContext);

    const nav = useNavigate();

    useEffect(() => {
        console.log(userData);
        if (userData.token) {
            nav('/');
        }
    }, [nav, userData]);

    return userData.token;
};

export { useCheckAuth };
