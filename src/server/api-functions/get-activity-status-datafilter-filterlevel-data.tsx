import { DataFilterLevelDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetActivityStatusDataFilterLevelData = async (payLoad: DataFilterLevelDataPayLoad) => {
    const url = `/complianceReports/activityStatusDataFilter`;

    const response = await Server(payLoad, url, 'POST');


    return response
}

export default GetActivityStatusDataFilterLevelData