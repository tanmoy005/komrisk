import { IncidentItemDetailsPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetIncidentTaskDataDetails = async (payLoad: IncidentItemDetailsPayLoad) => {
    const url = `/incidentTasks/mapDetails`;
    const response = await Server(payLoad, url, 'POST');
    return response
}

export default GetIncidentTaskDataDetails