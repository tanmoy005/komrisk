import { ComplianceAlertsHideDetailsPayload } from '@/src/types';
import Server from '@/src/server/server'

const GetComplianceAlertsHideDetails = async (payLoad: ComplianceAlertsHideDetailsPayload) => {
    const url = `/complianceAlerts/hide`;

    const response = await Server(payLoad, url, 'POST');

    return response
}

export default GetComplianceAlertsHideDetails