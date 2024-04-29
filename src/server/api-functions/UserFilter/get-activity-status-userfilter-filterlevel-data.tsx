import { UserFilterLevelDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetActivityStatusUserFilterLevelData = async (payLoad: UserFilterLevelDataPayLoad) => {
    const url = `/complianceReports/activityStatusUserFilter`;

    const response = await Server(payLoad, url, 'POST');

    return response
}

export default GetActivityStatusUserFilterLevelData