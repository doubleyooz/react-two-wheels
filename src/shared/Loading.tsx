import { RotatingLines } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className="flex w-full h-screen items-center justify-center">
            <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    );
};

export default Loading;
