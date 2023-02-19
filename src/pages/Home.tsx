import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Home: FC<{}> = () => {
    const { token } = useContext(AuthContext);
    const nav = useNavigate();

    useEffect(() => {
        console.log(token);
        if (!token) {
            nav('/login');
        }
    }, [token, nav]);

    return <div>Home</div>;
};

export default Home;
