import api from './api';
import { store } from "../redux/store";


export const getAnalytics = async ({ link }) => {
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

