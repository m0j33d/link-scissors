import api from './api';
import { store } from "../redux/store";
import { showAlert } from "../utils/utils";



export const short = async ({ url, custom_alias } : { url:string , custom_alias: null | string}) => {
    try {
        const token = store.getState().user_token;

        const response = await api.post(`/url/shorten`,  { url }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            
        });
        return response.data;
    } catch (error : any) {
        showAlert({
            msg: error.response.data.message,
            type: "danger",
        });

        console.log(error)
    }
};

export const getQRcode = async ({ url } : { url:string | null}) => {
    try {
        const token = store.getState().user_token;

        const response = await api.post(`/url/shorten/qrcode`,  { url }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            
        });
        return response.data;
    } catch (error : any) {
        showAlert({
            msg: error.response.data.message,
            type: "danger",
        });

        console.log(error)
    }
};

export const getAnalytics = async ({ link } : { link:string }) => {
    try {
        const token = store.getState().user_token;
        const params = new URLSearchParams({ link });

        const response = await api.get(`/fetch?${params.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.log(error)
    }
};

