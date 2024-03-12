import axios from 'axios';

interface Response { data: any, error: any, status: number | null };

const Server = async (payLoad: object, url: string, method: string) => {

    const api = axios.create({
        baseURL: "https://komrisknxtcont.komrisk.com/"
    });
    console.log("url", url);
    const headers =
    {
        headers: {
            "API-KEY": "1d339a8918bfd92522267f0dd76415f8",
            "Content-Type": "application/json",
            "Cookie": "JSESSIONID=86FE4C0D803C89A638BEC0F75AF59C5A"
        }
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