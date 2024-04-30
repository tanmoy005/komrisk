import { ProofListPayload } from '@/src/types';
import Server from '@/src/server/server'

const GetProofDataList = async (payLoad: ProofListPayload) => {
    const url = `/complianceTasks/getProofList`;
    const response = await Server(payLoad, url, 'POST');
    return response
}

export default GetProofDataList