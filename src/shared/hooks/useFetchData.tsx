import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext, { AuthUserContext } from '../../context/AuthContext';
import { findOneUser, refreshToken } from '../../services/auth.service';

function checkNullOrUndefined(...params: any[]): boolean {
    for (let i = 0; i < params.length; i++) {
        if (params[i] === null || params[i] === undefined) {
            return true;
        }
    }
    return false;
}

const useFetchData = (): string | null => {
    const { userData, setUserData } = useContext<AuthUserContext>(AuthContext);
    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            console.log('useFetchData');
            console.log(userData);
            if (
                checkNullOrUndefined(
                    userData.token,
                    userData._id,
                    userData.email,
                    userData.name,
                    userData.picture
                )
            ) {
                try {
                    const authResponse = await refreshToken();
                    console.log(authResponse);
                    if (authResponse) {
                        console.log('data response');
                        const { data, metadata } = authResponse.data;
                        const dataResponse = await findOneUser(
                            data._id,
                            metadata.accessToken
                        );
                        if (dataResponse) {
                            console.log(dataResponse);
                            setUserData({
                                email: dataResponse.data.data.email,
                                name: dataResponse.data.data.name,
                                picture: dataResponse.data.data.picture,
                                _id: data._id,
                                token: metadata.accessToken,
                            });
                        } else throw new Error('Could not retrieve user data');
                    }
                } catch (err) {
                    console.log('err');
                    console.log(err);
                    nav('/login');
                }
            }
        };

        fetchData();
    }, [nav, userData, setUserData]);

    return userData.token;
};

export { useFetchData };
