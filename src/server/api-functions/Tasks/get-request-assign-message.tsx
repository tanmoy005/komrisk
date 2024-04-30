import { RequestAssignPayload } from '@/src/types';
import Server from '@/src/server/server'

const GetRequestAssignData = async (payLoad: RequestAssignPayload) => {
    const url = `/complianceTasks/requestReassign`;
    const response = await Server(payLoad, url, 'POST');
    return response
}

export default GetRequestAssignData