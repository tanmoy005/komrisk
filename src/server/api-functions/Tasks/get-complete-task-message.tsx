import { CompleteTaskPayload } from '@/src/types';
import Server from '@/src/server/server'

const GetCompleteTaskData = async (payLoad: CompleteTaskPayload) => {
    const url = `/complianceTasks/completeTask`;

    const response = await Server(payLoad, url, 'POST');

    //console.log("response**********",response)

    return response
}

export default GetCompleteTaskData