import api from './api';
import { store } from "../redux/store";
import { showAlert } from "../utils/utils";


const LOGIN_USER = "loginUser";
const SET_USER = "setUser";
const SET_LOGGED_IN = "setLoggedOut";
const RESET = "reset";


export const login = async ({ email, password }: { email: string, password: string }) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const { token, user } = response.data;
        if (response.data.status){
            store.dispatch({
                type: LOGIN_USER,
                payload: token,
            });

            store.dispatch({
                type: SET_USER,
                payload: user,
            });
        }
            
        return response.data
    } catch (error : any) {
        showAlert({
            msg: error.response.data.message,
            type: "danger",
        });
        throw new Error('Login failed');
    }
};

export const register = async ({ name, email, password }: { name: string, email: string, password: string }) => {

    try {
        const response = await api.post('/auth/register', { fullName: name, email, password, confirmPassword: password });
        const { token, user } = response.data;

        if (response.data.status === true){

            store.dispatch({
                type: LOGIN_USER,
                payload: token,
            });

            store.dispatch({
                type: SET_USER,
                payload: user,
            });
        }
            
        return response.data

    } catch (error: any) {
        showAlert({
            msg: error.response.data.message,
            type: "danger",
        });

        throw new Error('Registration failed');
    }
};

export const getAuthenticatedUser = async () => {
    try {
        const token = store.getState().user_token;
        const response = await api.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data.status === true)
            store.dispatch({
                type: SET_USER,
                payload: response.data?.data,
            });

        return response.data;
    } catch (error) {
        store.dispatch({
            type: SET_LOGGED_IN,
            payload: false,
        });
    }
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

export const logout = async () => {
    store.dispatch({
        type: RESET,
    });
};

export const forgotPassword = async ({ email }: {email: string}) => {
    try {
        const response = await api.post('/auth/forgotPassword', { email });

        if (response.data.status === true){
            showAlert({
                msg: response.data.message,
                type: "success",
            });
            return response.data.message
        }
            
            
    } catch (error :any) {
        showAlert({
            msg: error.response.data.message,
            type: "danger",
        });
        throw new Error('Forgot password failed');
    }
};

export const resetPassword = async ( { token, password, password_confirmation} : {token: string, password: string, password_confirmation: string}) => {
    try {
        const response = await api.patch(`/auth/resetPassword/${token}`, { password, confirmPassword:password_confirmation });

        if (response.data.status === true){
            showAlert({
                msg: response.data.message,
                type: "success",
            });

            return response
        }

    } catch (error: any) {
        showAlert({
            msg: error.response.data.message,
            type: "danger",
        });
    }
};

