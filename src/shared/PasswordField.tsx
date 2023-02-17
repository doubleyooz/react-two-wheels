import { FC, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { UserLogin, UserSignUp } from './utils/user.util';
type FormType = UserLogin & UserSignUp;

const PasswordField: FC<{ register: any, placeholder: string }> = (props) => {
    const register = props.register as UseFormRegister<FormType>;

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex items-center w-full gap-1 bg-transparent border-b">
            <input
                className="w-full focus:outline-none"
                type={showPassword ? 'text' : 'password'}
                placeholder={props.placeholder}
                {...register('password')}
            />
            <div
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
        </div>
    );
};

export default PasswordField;
