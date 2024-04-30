import { ComplianceAlertsUpdateDetailsPayload } from '@/src/types';
import Server from '@/src/server/server'

const GetComplianceAlertsUpdateDetails = async (payLoad: ComplianceAlertsUpdateDetailsPayload) => {
    const url = `/complianceAlerts/updateStatus`;

    const response = await Server(payLoad, url, 'POST');

    return response
}

export default GetComplianceAlertsUpdateDetails