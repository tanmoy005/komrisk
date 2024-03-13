import { ActivityStatusDataPayLoad } from '@/src/types';
import Server from '../server'

const GetActivityStatusData = async (payLoad: ActivityStatusDataPayLoad) => {
    const url = `/komrisk/api/complianceReports/activityStatusData`;

    const response = await Server(payLoad, url, 'POST');

    return response
}

export default GetActivityStatusData