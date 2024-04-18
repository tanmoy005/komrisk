import { IncidentComparisonDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetIncidentComaparisonData = async (payLoad: IncidentComparisonDataPayLoad) => {
    const url = `/incidentReports/comparisonData`;
    const response = await Server(payLoad, url, 'POST');
    return response
}

export default GetIncidentComaparisonData