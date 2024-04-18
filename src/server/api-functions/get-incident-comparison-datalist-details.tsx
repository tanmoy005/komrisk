import { IncidentComparisonDataListPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetIncidentComparisonDataList = async (payLoad: IncidentComparisonDataListPayLoad) => {
    const url = `/incidentReports/comparisonDataList`;
    const response = await Server(payLoad, url, 'POST');
    return response
}

export default GetIncidentComparisonDataList