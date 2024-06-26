import { ImpactAnalysisDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetImpactAnalysisData = async (payLoad: ImpactAnalysisDataPayLoad) => {
    const url = `/complianceReports/impactAnalysisData`;

    const response = await Server(payLoad, url, 'POST');

    return response
}

export default GetImpactAnalysisData