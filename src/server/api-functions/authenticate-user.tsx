import { UserModel } from '@/src/types';
import Server from '../server';

const AuthenticateUser = async(payLoad: UserModel) => {
    const url = `komrisk/api/auth/login`;
    const response = await Server(payLoad, url, 'POST');

    return response
}

export default AuthenticateUser