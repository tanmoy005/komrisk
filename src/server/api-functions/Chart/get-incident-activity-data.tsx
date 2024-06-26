import { IncidentActivityDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetIncidentActivityData = async (payLoad: IncidentActivityDataPayLoad) => {
    const url = `/incidentReports/activityStatusData`;

    const response = await Server(payLoad, url, 'POST');

    return response
}

export default GetIncidentActivityData