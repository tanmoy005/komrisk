import { DownloadProofPayload } from '@/src/types';
import Server from '@/src/server/server'

const GetDownloadProof = async (payLoad: DownloadProofPayload) => {
    const url = `/complianceTasks/downloadProof`;
    const response = await Server(payLoad, url, 'POSTBLOB');
    return response
}

export default GetDownloadProof