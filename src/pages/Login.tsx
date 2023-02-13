import { FC } from 'react';
import { Link } from 'react-router-dom';
import LoginImage from '../assets/login-1.png';

const Login: FC<{}> = () => {
    return (
        <div className="flex">
            <img className="h-screen w-2/3" src={LoginImage} />

            <div className="flex flex-col w-full">
                <span>Login</span>
                <div className="flex gap-1">
                    <span>New visitor?</span>
                    <Link to="/signup">Create an account</Link>
                    <span>{'here'}</span>
                </div>
                <form className="flex flex-col items-center">
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Password" />
                    <input type="submit" value="Log in" />
                </form>
            </div>
        </div>
    );
};

export default Login;
