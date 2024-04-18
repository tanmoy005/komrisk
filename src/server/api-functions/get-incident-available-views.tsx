import { UserModel } from '@/src/types';
import Server from '@/src/server/server'

const GetIncidentAvailableViews = async (payLoad: UserModel) => {
    const url = `/incidentReports/availableViews`;
    const response = await Server(payLoad, url, 'POST');
    return response
}

export default GetIncidentAvailableViews