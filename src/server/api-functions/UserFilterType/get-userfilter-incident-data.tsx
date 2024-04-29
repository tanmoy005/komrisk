import {  UserFilterDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetIncidentUserFilterData = async (payLoad: UserFilterDataPayLoad) => {
    const url = `/incidentReports/userFilterType`;

    const response = await Server(payLoad, url, 'POST');

    //console.log("response**********",response)

    return response
}

export default GetIncidentUserFilterData