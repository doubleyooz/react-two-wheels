import { FC, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, UseFormRegister } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserLogin, userRules } from '../shared/utils/user.util';
import LoginImage from '../assets/login-1.png';
import PasswordField from '../shared/PasswordField';
import AuthContext from '../context/AuthContext';

type FormValues = {
    email: string;
    password: string;
};
const schema = yup.object({
    email: userRules.email.required(),
    password: userRules.password.required(),
});

const Login: FC<{}> = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const { handleSignIn, token } = useContext(AuthContext);

    const nav = useNavigate();

    const onSubmit = async (data: UserLogin) => {
        console.log(data);

        await handleSignIn(data.email, data.password);

        nav('/');
    };

    useEffect(() => {
        console.log(token);
        if (token) {
            nav('/');
        }
    }, [token, nav]);

    return (
        <div className="flex">
            <img className="hidden sm:block h-screen w-2/3" src={LoginImage} />
            <div
                className="sm:fixed sm:right-0 h-screen w-full sm:w-1/2 bg-white z-50"
                style={{ borderRadius: '60px' }}
            >
                <div className="flex flex-col w-full justify-start gap-3 px-24 py-36">
                    <span className="text-4xl">Login</span>
                    <div className="">
                        <p className="text-base">
                            New visitor?{' '}
                            <Link
                                className="text-default-detail text-base cursor-pointer"
                                to="/sign-up"
                            >
                                Create an account
                            </Link>{' '}
                            here
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col items-start gap-5"
                    >
                        <div className="flex flex-col w-full">
                            <input
                                className="border-b w-full focus:outline-none"
                                type="text"
                                placeholder="Email"
                                {...register('email')}
                            />
                            {errors.email && (
                                <div className="-mt-1">
                                    <span className="text-red-600 text-xs">
                                        {errors.email.message}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full items-end">
                            <div className="flex flex-col w-full">
                                <PasswordField
                                    register={register}
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <div className="-mt-1">
                                        <span className="text-red-600 text-xs">
                                            {errors.password.message}
                                        </span>
                                    </div>
                                )}

                                <p className="text-right text-xs">
                                    Click{' '}
                                    <Link
                                        className="text-default-detail text-xs cursor-pointer"
                                        to="/recover-password"
                                    >
                                        here
                                    </Link>{' '}
                                    in case you forget your password
                                </p>
                            </div>
                        </div>

                        <div className="flex w-full justify-center mt-16">
                            <input
                                className="bg-default-detail py-3 w-1/2 rounded-lg cursor-pointer hover:bg-default-detail_hover"
                                type="submit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
