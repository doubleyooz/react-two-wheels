import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

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

const config = (token: string): AxiosRequestConfig => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
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
        email: email,
        name: name,
        password: password,
    });
};

const findOneUser = async (_id: string, token: string) => {
    return await api.get(`/users/${_id}`, config(token));
};

const findUsers = async (token: string, name?: string) => {
    const url = name ? `/users?name=${name}` : '/users';
    return await api.get(url, config(token));
};

const refreshToken = async () => {
    return await api.get('/refresh-token', { withCredentials: true });
};

const revokeToken = async () => {
    return await api.get('/revoke-token', { withCredentials: true });
};

export { findOneUser, findUsers, refreshToken, revokeToken, signIn, signUp };
