// import { create } from 'ipfs-http-client';
// import config_env from "../../config/env"
import { FleekSdk, ApplicationAccessTokenService } from '@fleek-platform/sdk';

// Method                      Description
// -----------------------------------------------------------------------------------------------------------------
// uploadFile                  Upload a file to IPFS
// uploadDirectory             Upload a directory to IPFS
// uploadVirtualDirectory      Upload a virtual directory to IPFS
// get                         Get a file by CID
// getByFilename               Get a file by Filename
// list                        List files
// delete                      Delete a file by CID

// ------
const applicationService = new ApplicationAccessTokenService({
    // clientId: config_env.fleekClientId,
    clientId: 'client_IP-HjNmf_tkqVw2TcvyS',
    // authAppsServiceUrl:'http://localhost:5173/',
});

const fleekSdk = new FleekSdk({
    accessTokenService: applicationService
});

// ---
export const uploadToIPFS = async (file: File, setProgress: (progress: number) => void) => {
    // Check the file
    if (!file) {
        throw new Error('File is empty!');
    }

    if (file.size > 5 * 1024 * 1024) {
        throw new Error('The file size cannot exceed 5MB');
    }

    try {
        const fileLike = {
            name: file.name,
            stream: () => file.stream(),
        };

        const uploadResponse = await fleekSdk.storage().uploadFile({
            file: fileLike,
            onUploadProgress: (progress) => {
                const percentage = Math.round(((progress.loadedSize ?? 0) / (progress.totalSize ?? 1)) * 100);
                setProgress(percentage);
            }
        });
        // ----
        return uploadResponse.pin.cid;
    } catch (error) {
        console.error('Upload to IPFS error:', error);
        throw error;
    }
};

