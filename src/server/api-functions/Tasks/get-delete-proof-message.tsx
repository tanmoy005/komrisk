import { DeleteProofPayload } from '@/src/types';
import Server from '@/src/server/server'

const GetDeleteProofData = async (payLoad: DeleteProofPayload) => {
    const url = `/complianceTask/deleteProof`;
    const response = await Server(payLoad, url, 'POST');
    return response
}

export default GetDeleteProofData