import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, UseFormRegister } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userRules } from '../shared/utils/user.util';
import LoginImage from '../assets/login-1.png';
import PasswordField from '../shared/PasswordField';
import { signUp } from '../services/auth.service';
import { useCheckAuth } from '../shared/hooks/useCheckAuth';
import Loading from '../shared/Loading';

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
};
const schema = yup.object({
    email: userRules.email.required(),
    password: userRules.password.required(),
    confirmPassword: userRules.password
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required(),
    name: userRules.name.required(),
});

const SignUp: FC<{}> = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const nav = useNavigate();
    const token = useCheckAuth();
    if (token) {
        return <Loading />;
    }
 

    const onSubmit = async (data: FormValues) => {
        console.log(data);

        await signUp(data.email, data.name, data.password);

        nav('/login');
    };

    return (
        <div className="flex">
            <img className="hidden sm:block h-screen w-2/3" src={LoginImage} />
            <div
                className="sm:fixed sm:right-0 h-screen w-full sm:w-1/2 bg-white z-50"
                style={{ borderRadius: '60px' }}
            >
                <div className="flex flex-col w-full justify-start gap-3 px-24 py-36">
                    <span className="text-4xl">Create an account</span>
                    <div className="">
                        <p className="text-base">
                            Already have an account?{' '}
                            <Link
                                className="text-default-detail text-base cursor-pointer"
                                to="/login"
                            >
                                Login
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
                                placeholder="Name"
                                {...register('name')}
                            />
                            {errors.name && (
                                <div className="-mt-1">
                                    <span className="text-red-600 text-xs">
                                        {errors.name.message}
                                    </span>
                                </div>
                            )}
                        </div>
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
                                    value="password"
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <div className="-mt-1">
                                        <span className="text-red-600 text-xs">
                                            {errors.password.message}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col w-full items-end">
                            <div className="flex flex-col w-full">
                                <PasswordField
                                    register={register}
                                    value="confirmPassword"
                                    placeholder="Confirm Password"
                                />
                                {errors.confirmPassword && (
                                    <div className="-mt-1">
                                        <span className="text-red-600 text-xs">
                                            {errors.confirmPassword.message}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex w-full justify-center mt-16">
                            <input
                                className="bg-default-detail py-3 w-1/2 rounded-lg cursor-pointer hover:bg-default-detail_hover"
                                type="submit"
                                value="Register Account"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
