import { ActivityStatusDataListPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetActivityStatusDataList = async (payLoad: ActivityStatusDataListPayLoad) => {
    const url = `/komrisk/api/complianceReports/activityStatusDataList`;

    const response = await Server(payLoad, url, 'POST');

    return response
}

export default GetActivityStatusDataList