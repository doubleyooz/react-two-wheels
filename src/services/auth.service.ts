import axios, { AxiosInstance } from 'axios';

axios.defaults.headers.common[
    'Access-Control-Allow-Origin'
] = `${process.env.REACT_APP_AUTH_SERVER}`;
axios.defaults.withCredentials = true;

interface Response {
    data: { _id: string };
    message: string;
    metadata: { accessToken: string };
}

const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_AUTH_SERVER,
});

const config = (token: string) => {
    return {
        headers: {
            Authorization: `Basic ${token}`,
        },
    };
};

const signIn = async (email: string, password: string) => {
    return await api.get(`/sign-in`, {
        auth: {
            username: email,
            password: password,
        },
    });
};

const signUp = async (email: string, name: string, password: string) => {
    return await api.post(`/users`, {
        auth: {
            username: email,
            name: name,
            password: password,
        },
    });
};

const refreshToken = async () => {
    return await api.get('/refresh-token', { withCredentials: true });
};

export { refreshToken, signIn, signUp };
