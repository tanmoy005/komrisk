import { IncidentActivityDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetIncidentActivityData = async (payLoad: IncidentActivityDataPayLoad) => {
    const url = `/incidentReports/activityStatusData`;

    const response = await Server(payLoad, url, 'POST');
    //console.log("response***************",response)

    return response
}

export default GetIncidentActivityData