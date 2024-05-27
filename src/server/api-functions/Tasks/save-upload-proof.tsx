import { UserModel } from '@/src/types';
import Server from '@/src/server/server';

const SaveUploadProof= async (formData: FormData) => {
    const url = `/complianceTasks/saveUploadedProof`;

    const response = await Server(formData, url, 'POST');

    return response;
}

export default SaveUploadProof;
