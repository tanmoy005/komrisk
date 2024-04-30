import { DataFilterLevelDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetComplianceStatusDataFilterLevelData = async (payLoad: DataFilterLevelDataPayLoad) => {
    const url = `/complianceReports/comparisonDataFilter`;
    const response = await Server(payLoad, url, 'POST');
    return response
}

export default GetComplianceStatusDataFilterLevelData