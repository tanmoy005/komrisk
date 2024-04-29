import { ImpactAnalysisDataListPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetImpactAnalysisDataList = async (payLoad: ImpactAnalysisDataListPayLoad) => {
    const url = `/complianceReports/impactAnalysisDataList`;

    const response = await Server(payLoad, url, 'POST');

    return response
}

export default GetImpactAnalysisDataList