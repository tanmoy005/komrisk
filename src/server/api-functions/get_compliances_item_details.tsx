import { CompliancesItemDetailsPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetCompliancesItemDetails = async (payLoad: CompliancesItemDetailsPayLoad) => {
    const url = `/compliances/details`;

    const response = await Server(payLoad, url, 'POST');

    return response
}

export default GetCompliancesItemDetails