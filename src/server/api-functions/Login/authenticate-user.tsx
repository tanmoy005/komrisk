import { UserModel } from '@/src/types';
import Server from '../../server';

const AuthenticateUser = async(payLoad: UserModel) => {
    const url = `/auth/login`;
    const response = await Server(payLoad, url, 'POST', false);

    return response
}

export default AuthenticateUser