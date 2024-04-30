import { DataFilterDataPayLoad } from '@/src/types';
import Server from '@/src/server/server'

const GetComplianceDataFilterData = async (payLoad: DataFilterDataPayLoad) => {
    const url = `/complianceReports/dataFilterType`;
    const response = await Server(payLoad, url, 'POST');
    return response
}

export default GetComplianceDataFilterData