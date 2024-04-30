import { ComplianceTaskMapDetailsPayLoad } from '@/src/types';
import Server from '@/src/server/server'




const GetComplianceTaskDataDetails = async (payLoad: ComplianceTaskMapDetailsPayLoad) => {
    
    const url = `/complianceTasks/mapDetails`;
    const response = await Server(payLoad, url, 'POST');
    
    return response
}

export default GetComplianceTaskDataDetails