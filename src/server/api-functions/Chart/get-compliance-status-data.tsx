import { ComplianceStatusDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetComplianceStatusData = async (payLoad: ComplianceStatusDataPayLoad) => {
    const url = `/complianceReports/comparisonData`;

    const response = await Server(payLoad, url, 'POST');

    return response
}

export default GetComplianceStatusData