
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import getDataFromAsyncStorage from '@/src/utils/associate/get-from-localstorage';

interface Response {
    data: any,
    error: any,
    status: number | null
};

const Server = async (payLoad: object | FormData, url: string, method: string, hasToken: boolean = true): Promise<Response> => {
    const baseUrl = await getDataFromAsyncStorage('baseUrl');
    const token = await getDataFromAsyncStorage('token');

    const api = axios.create({
        baseURL: baseUrl
    });

    const commonHeader = {
        "API-KEY": "1d339a8918bfd92522267f0dd76415f8",
        "Cookie": "JSESSIONID=86FE4C0D803C89A638BEC0F75AF59C5A"
    };

    // Determine Content-Type header based on payload type
    const contentTypeHeader = (payLoad instanceof FormData) ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" };

    const authHeader = {
        ...commonHeader,
        ...contentTypeHeader,
        "Authorization": `Bearer ${token}`
    };
    const noAuthHeader = {
        ...commonHeader,
        ...contentTypeHeader,
    };

    const headers = {
        headers: hasToken ? authHeader : noAuthHeader
    };

    let response: Response = { data: "", error: "", status: null };

    try {
        switch (method) {
            case 'GET':
                const { data: getData, status: getStatus } = await api.get(url, headers);
                response.data = getData;
                response.status = getStatus;
                break;
            case 'POST':
                const { data: postData, status: postStatus } =
                    //await axios.post(url, { Benefits: payLoad }, { responseType: 'blob' });

                    await api.post(url, payLoad, headers);
                response.data = postData;
                response.status = postStatus;
                break;

            case 'POSTBLOB':
                const { data: BlobData, status: blobStatus } =
                    await api.post(url, payLoad, {
                        headers: authHeader,
                        responseType: 'blob', // Ensure response is handled as a Blob
                    });
                response.data = BlobData;
                response.status = blobStatus;
                break;
            // Add other methods (PUT, DELETE, etc.) if needed
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            response.error = error.response?.data || error.message;
            response.status = error.response?.status ?? null;
            if (response.status === 401) {
                await AsyncStorage.removeItem('token'); // Assuming you store the token in AsyncStorage
                router.replace('/(pages)');
            }
        } else {
            response.error = error;
        }
    } finally {
        return response;
    }
};

export default Server;
