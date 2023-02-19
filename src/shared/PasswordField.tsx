import { FC, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { UserLogin, UserSignUp } from './utils/user.util';
type FormType = UserLogin & UserSignUp;

const PasswordField: FC<{
    register: any;
    placeholder: string;
    value: 'confirmPassword' | 'password';
}> = ({ register, placeholder, value }) => {
    const typedRegister = register as UseFormRegister<FormType>;

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    return (
        <div className="flex items-center w-full gap-1 bg-transparent border-b">
            <input
                className="w-full focus:outline-none"
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                {...typedRegister(value)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
