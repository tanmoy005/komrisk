import axios from 'axios';
import { useSelector } from 'react-redux';
import { ReduxState } from '../types';

interface Response { data: any, error: any, status: number | null };

const Server = async (payLoad: object, url: string, method: string, hasToken: boolean = true) => {

    // const loginDataSlice = useSelector( (state) => state.loginDataSlice);
    // console.log("loginDataSlice", loginDataSlice);
    
    const api = axios.create({
        baseURL: "https://komrisknxtcont.komrisk.com/"
    });
    console.log("url", url);

    const commonHeader = {
        "API-KEY": "1d339a8918bfd92522267f0dd76415f8",
        "Content-Type": "application/json",
        "Cookie": "JSESSIONID=86FE4C0D803C89A638BEC0F75AF59C5A"
    }
    const authHeader = {
        ...commonHeader,
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjkyLCJleHBpcmF0aW9uVGltZSI6MTcxMDM0MjYyMSwiaXNzdWVyIjoiaHR0cHM6Ly93d3cua29tcmlzay5jb20ifQ.7qjjJzDvVyWB3eCc8YXeEAzkPpQ06ViMbfBAaRZfACQ"

    }
    const headers =
    {
        headers: hasToken ? authHeader: commonHeader
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