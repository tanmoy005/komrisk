import { ActivityStatusUserFilterDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetActivityStatusUserFilterData = async (payLoad: ActivityStatusUserFilterDataPayLoad) => {
    const url = `/complianceReports/userFilterType`;

    const response = await Server(payLoad, url, 'POST');

    //console.log("response**********",response)

    return response
}

export default GetActivityStatusUserFilterData