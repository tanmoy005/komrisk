import { UserFilterDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetComplianceUserFilterData = async (payLoad: UserFilterDataPayLoad) => {
    const url = `/complianceReports/userFilterType`;
    const response = await Server(payLoad, url, 'POST');
    return response
}

export default GetComplianceUserFilterData