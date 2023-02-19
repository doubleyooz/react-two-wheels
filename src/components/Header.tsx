import { FC } from 'react';
import { Link } from 'react-router-dom';

const MenuLink: FC<{ path: string; value: string }> = ({ path, value }) => {
    return (
        <div className="px-6">
            <Link to={path}>{value}</Link>
        </div>
    );
};

const Header: FC<{}> = () => {
    return (
        <div className="flex justify-between items-center px-9 bg-green-400 w-full">
            <div>
                <span className='text-2xl'>two wheelers</span>
            </div>
            <div className="flex gap-1 items-center">
                <MenuLink path="/" value="Home" />
                <MenuLink path="/" value="Motorcycles" />
                <MenuLink path="/" value="Contact Us" />

                <img
                    className="rounded-full h-14 w-14 my-3 border border-default-detail"
                    src={localStorage.getItem('picture') || ''}
                    alt=""
                />
            </div>
        </div>
    );
};

export default Header;
