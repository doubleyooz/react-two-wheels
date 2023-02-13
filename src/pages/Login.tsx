import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useForm, UseFormRegister } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LoginImage from '../assets/login-1.png';

type FormValues = {
    email: string;
    password: string;
};
const schema = yup
    .object({
        email: yup.string().email().required(),
        password: yup
            .string()
            .matches(/^(?=.*[a-z])/, 'Must contain at least 1 lowercase letter')
            .matches(/^(?=.*[A-Z])/, 'Must contain at least 1 uppercase letter')
            .matches(/^(?=.*\d)/, 'Must contain at least a number')
            .matches(
                /(?=.*[^a-zA-Z0-9])/,
                'Must contain at least 1 special character'
            )
            .min(8)
            .required(),
    })
    .required();

const Login: FC<{}> = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormValues) => {
        console.log(data);

        //const result = await handleSignIn(data.email, data.password);

        //console.log(result);
    };

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
                                to="/signup"
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
                        <input
                            className="border-b w-full focus:outline-none"
                            type="text"
                            placeholder="Email"
                        />
                        <div className="flex flex-col w-full items-end">
                            <input
                                className="border-b w-full focus:outline-none"
                                type="text"
                                placeholder="Password"
                            />

                            <p className="text-xs">
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
