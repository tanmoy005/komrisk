import { DownloadProofPayload } from '@/src/types';
import Server from '@/src/server/server'

const GetDownloadProof = async (payLoad: DownloadProofPayload) => {
    const url = `/complianceTasks/downloadProof`;
    const response = await Server(payLoad, url, 'POST');
    //console.log("response got from download proof",response);
    
    return response
}

export default GetDownloadProof