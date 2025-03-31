// import React,{ useCallback } from 'react';
import { useCompressFiles } from '../compress/compress';
import { useKeyCidPasswContext } from '../useState/keyCidPassword';
import { useFileImageContext } from '../useState/fileImage';
import { useBoxInfoContext } from '../useState/boxInfo';
import { useProgressContext } from '../useState/progress';
import { nftForm_mint } from '../useState/nftForm';
import { mergeArrays } from '@dapp/utils/mergeArray/mergeArray';
import { uploadToIPFS } from '@dapp/utils/upload/uploadToIPFS';
// import { AddTime } from '@dapp/utils/addTime';

export const useFirstStep = () => {
    const { compressFiles,compressFiles_noPassword } = useCompressFiles();
    const { fileList, imageFile } = useFileImageContext() ||{};
    const { updateCidPasswState} = useKeyCidPasswContext()||{};
    const {updateBoxInfo} = useBoxInfoContext()||{};
    const {updateMintProgress} = useProgressContext()||{};
    // const passwordZip = uploadContext?.filePassState.passworld;
    // const fileZip = uploadContext?.filePassState.fileZIP;

    const executeFirstStep = async (jsonState: any) => {
        const time = jsonState.time;
        const allFiles = mergeArrays(fileList || [], imageFile || []);
        const radio = nftForm_mint.radio;

        try {
            let fileCid;
            let imageCid;
            let fileZip;
            let fileName='';
            let password_com='';
            
            // Step 1, compression
            if (radio === 'Storing') {
                const {zipBlob, zipName, zipPassword} = await compressFiles(allFiles);
                updateCidPasswState?.('password', zipPassword);
                fileZip = zipBlob;
                fileName = zipName;
                password_com = zipPassword;
            } else if (radio === 'Public') {
                const {zipBlob, zipName} = await compressFiles_noPassword(allFiles);
                fileZip = zipBlob;
                fileName = zipName;

            } else {
                alert('radio is error!');
                return;
            }
            
            // Step 2：File to IPFS
            if (fileZip instanceof Blob) {
                const file = new File([fileZip], fileName, { type: fileZip.type });
                const newCID = await uploadToIPFS(file, (progress) => {
                    updateMintProgress?.('upload_FileProgress', progress);
                });
                updateCidPasswState?.('fileCID', newCID);
                updateMintProgress?.('upload_FileIsLoading', true);
                fileCid=newCID;
            } else {
                updateMintProgress?.('upload_FileError', 'fileZip is not a Blob');
                throw new Error('fileZip is not a Blob');
            }

            // Step 3：Image to IPFS
            if (imageFile && imageFile.length > 0) {
                const file = imageFile[0].originFileObj;

                if (file) {
                    // Image name
                    const fileExtension = file.name.split('.').pop();
                    const newFileName = `${time}.${fileExtension}`;
                    const renamedFile = new File([file], newFileName, { type: file.type });

                    const newCID = await uploadToIPFS(renamedFile, (progress) => {
                        updateMintProgress?.('upload_ImageProgress', progress);
                    });
                    updateBoxInfo?.('imageCID', newCID);
                    updateMintProgress?.('upload_ImageIsLoading', true);
                    imageCid=newCID
                } else {
                    console.warn('imageFile is empty!');
                    updateMintProgress?.('upload_ImageError', 'No image!');
                } 
            } else {
                console.warn('No image!');
                updateMintProgress?.('upload_ImageError', 'No image!');
            } 

            const jsonCopy = {...jsonState, fileCID: fileCid, imageCID: imageCid, password:password_com}
            return jsonCopy;
        } catch (error) {
            console.error('First step error:', error);
            updateMintProgress?.('upload_FileError', 'No file!');
            updateMintProgress?.('upload_ImageError', 'No image!');
            throw error;
        } 
    };

    return executeFirstStep;
};