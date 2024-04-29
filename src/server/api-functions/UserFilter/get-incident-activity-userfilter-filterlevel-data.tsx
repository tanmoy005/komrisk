import { UserFilterLevelDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetIncidentActivityUserFilterLevelData = async (payLoad: UserFilterLevelDataPayLoad) => {
    const url = `/incidentReports/activityStatusUserFilter`;

    const response = await Server(payLoad, url, 'POST');

    //console.log("response**********",response)

    return response
}

export default GetIncidentActivityUserFilterLevelData