import { UserFilterLevelDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetComplianceStatusUserFilterLevelData = async (payLoad: UserFilterLevelDataPayLoad) => {
    const url = `/complianceReports/comparisonUserFilter`;
    const response = await Server(payLoad, url, 'POST');
    return response
}

export default GetComplianceStatusUserFilterLevelData