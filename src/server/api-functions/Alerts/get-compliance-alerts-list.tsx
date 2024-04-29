import { UserModel } from '@/src/types';
import Server from '@/src/server/server'

const GetComplianceAlertsListDetails = async (payLoad: UserModel) => {
    const url = `/complianceAlerts/list`;

    const response = await Server(payLoad, url, 'POST');

    return response
}

export default GetComplianceAlertsListDetails