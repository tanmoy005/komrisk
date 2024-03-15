import Server from '../server'
interface WorkspacePayLoad {
    Url: string;
}

const AuthenticateWorkspace = async (payLoad: WorkspacePayLoad) => {
    const url = `komrisk/api/auth/authURL`;
    const response = await Server(payLoad, url, 'POST', false);

    return response
}

export default AuthenticateWorkspace