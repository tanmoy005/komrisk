import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/RootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDataFromAsyncStorage } from '../utils';


interface Response { data: any, error: any, status: number | null };

const Server = async (payLoad: object, url: string, method: string, hasToken: boolean = true) => {

    const baseUrl = await getDataFromAsyncStorage('baseUrl');
    const token = await getDataFromAsyncStorage('token');

    const api = axios.create({
        baseURL: baseUrl
    });

    const commonHeader = {
        "API-KEY": "1d339a8918bfd92522267f0dd76415f8",
        "Content-Type": "application/json",
        "Cookie": "JSESSIONID=86FE4C0D803C89A638BEC0F75AF59C5A"
    }
    const authHeader = {
        ...commonHeader,
        "Authorization": `Bearer ${token}`

    }
    const headers =
    {
        headers: token ? authHeader : commonHeader
    }
    let response: Response = { data: "", error: "", status: null };

    try {
        switch (method) {
            case 'GET':
                const { data: getData, status: getStatus } = await api.get(url, headers);
                response.data = getData;
                response.status = getStatus;
                break;
            case 'POST':
                const { data: postData, status: postStatus } = await api.post(url, payLoad, headers);

                response.data = postData;
                response.status = postStatus;
                break;
        }
    } catch (error) {
        response.error = error;
    } finally {
        return response
    }
}

export default Server