import { UserFilterLevelDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetIncidentComparisonUserFilterLevelData = async (payLoad: UserFilterLevelDataPayLoad) => {
    const url = `/incidentReports/comparisonUserFilter`;

    const response = await Server(payLoad, url, 'POST');

    //console.log("response**********",response)

    return response
}

export default GetIncidentComparisonUserFilterLevelData