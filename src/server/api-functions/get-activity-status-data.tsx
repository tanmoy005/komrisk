import { ActivityStatusDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetActivityStatusData = async (payLoad: ActivityStatusDataPayLoad) => {
    const url = `/complianceReports/activityStatusData`;

    const response = await Server(payLoad, url, 'POST');

    return response
}

export default GetActivityStatusData