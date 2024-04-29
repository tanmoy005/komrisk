import { IncidentActivityDataListPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetIncidentActivityDataList = async (payLoad: IncidentActivityDataListPayLoad) => {
    const url = `/incidentReports/activityStatusDataList`;

    const response = await Server(payLoad, url, 'POST');

    return response
}

export default GetIncidentActivityDataList