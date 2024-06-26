import { DataFilterLevelDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetImpactAnalysisDataFilterLevelData = async (payLoad: DataFilterLevelDataPayLoad) => {
    const url = `/complianceReports/impactAnalysisDataFilter`;
    const response = await Server(payLoad, url, 'POST');
    return response
}

export default GetImpactAnalysisDataFilterLevelData