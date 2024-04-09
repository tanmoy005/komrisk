import { ImpactAnalysisDataListPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetImpactAnalysisDataList = async (payLoad: ImpactAnalysisDataListPayLoad) => {
    const url = `/complianceReports/impactAnalysisDataList`;

    const response = await Server(payLoad, url, 'POST');

    console.log("response***************",response)

    return response
}

export default GetImpactAnalysisDataList