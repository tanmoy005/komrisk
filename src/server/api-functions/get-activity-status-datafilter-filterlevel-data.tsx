import { DataFilterLevelDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetActivityStatusDataFilterLevelData = async (payLoad: DataFilterLevelDataPayLoad) => {
    const url = `/complianceReports/activityStatusDataFilter`;

    const response = await Server(payLoad, url, 'POST');

    //console.log("response**********",response)

    return response
}

export default GetActivityStatusDataFilterLevelData