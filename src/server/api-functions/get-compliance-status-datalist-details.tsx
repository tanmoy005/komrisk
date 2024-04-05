import { ComplianceStatusDataListPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetComplianceStatusDataList = async (payLoad: ComplianceStatusDataListPayLoad) => {
    const url = `/complianceReports/comparisonDataList`;

    const response = await Server(payLoad, url, 'POST');

    return response
}

export default GetComplianceStatusDataList