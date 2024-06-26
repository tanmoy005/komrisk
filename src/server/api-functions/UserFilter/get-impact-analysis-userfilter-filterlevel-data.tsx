import { UserFilterLevelDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetImpactAnalysisUserFilterLevelData = async (payLoad: UserFilterLevelDataPayLoad) => {
    const url = `/complianceReports/impactAnalysisUserFilter`;
    const response = await Server(payLoad, url, 'POST');
    return response
}

export default GetImpactAnalysisUserFilterLevelData