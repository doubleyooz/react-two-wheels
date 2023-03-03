import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useCheckAuth } from '../shared/hooks/useCheckAuth';
import { useFetchData } from '../shared/hooks/useFetchData';
import Loading from '../shared/Loading';

const Home: FC<{}> = () => {
    const token = useFetchData();
    const { userData } = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {};
        console.log('retrieve chat');
        fetchData();
    }, []);
    console.log(token);
    switch (token) {
        case null:
        case undefined:
            return <Loading />;
        default:
            return <div>Home</div>;
    }
};

export default Home;
