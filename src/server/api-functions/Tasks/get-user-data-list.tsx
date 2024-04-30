import { UserListPayload } from '@/src/types';
import Server from '@/src/server/server'

const GetUserDataList = async (payLoad: UserListPayload) => {
    const url = `/complianceTasks/getUserList`;
    const response = await Server(payLoad, url, 'POST');
    return response
}

export default GetUserDataList