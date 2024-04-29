import { UserModel } from '@/src/types';
import Server from '@/src/server/server'

const GetUserAccessDetails = async (payLoad: UserModel) => {
    const url = `/users/accessDetails`;

    const response = await Server(payLoad, url, 'POST');

    return response
}

export default GetUserAccessDetails