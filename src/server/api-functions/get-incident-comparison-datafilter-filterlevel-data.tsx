import { DataFilterLevelDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetIncidentComparisonDataFilterLevelData = async (payLoad: DataFilterLevelDataPayLoad) => {
    const url = `/incidentReports/comparisonDataFilter`;

    const response = await Server(payLoad, url, 'POST');

    //console.log("response**********",response)

    return response
}

export default GetIncidentComparisonDataFilterLevelData