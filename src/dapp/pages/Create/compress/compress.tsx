// import { 
//     useState 
// } from 'react';
import CryptoJS from 'crypto-js';
import { saveAs } from 'file-saver';
import * as zip from "@zip.js/zip.js";
import type { UploadFile } from 'antd/es/upload/interface';
import { useKeyCidPasswContext } from '../useState/keyCidPassword';
import { useProgressContext } from '../useState/progress';

interface CompressResult {
    zipBlob: Blob | null;
    zipName:string;
    zipPassword:string;
}

interface CompressResult_noPassword {
    zipBlob: Blob | null;
    zipName:string;
}

// 
const generateRandomFileName = (length: number = 28): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    let randomLength:number;
    if (length>=25 && length <= 32) {
        randomLength = length;
    } else {
        randomLength = Math.floor(Math.random() * (32 - 25 + 1)) + 25; // 
    }
    for (let i = 0; i < randomLength; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export const useCompressFiles = () => {
    const {updateCidPasswState} = useKeyCidPasswContext() || {};
    const {updateMintProgress} = useProgressContext() || {};

    const compressFiles = async (files: UploadFile[]): Promise<CompressResult> => {
        updateMintProgress?.('isLoading',true)
        try {
            // Has files 
            if (files.length === 0) {
                throw new Error('No file!');
            }
            
            // Create a zip file
            const writer = new zip.ZipWriter(new zip.BlobWriter("application/zip"));
            const newPassword = CryptoJS.lib.WordArray.random(32).toString(); // 
            updateCidPasswState?.('password',newPassword)

            // Add the file into zip
            for (const file of files) {
                if (file.originFileObj) {
                    const arrayBuffer = await file.originFileObj.arrayBuffer(); // get the file as an array buffer
                    // add the file to the zip file
                    await writer.add(file.name, new zip.Uint8ArrayReader(new Uint8Array(arrayBuffer)), {
                        password: newPassword
                    });
                }
            }

            // Close the zip
            const newZipBlob = await writer.close();

            const randomName = generateRandomFileName();
            const fileName = `${randomName}.zip`;
            saveAs(newZipBlob, fileName);
            updateCidPasswState?.('fileName',fileName)
            updateMintProgress?.('compressIsLoading',true)
            return { zipBlob: newZipBlob, zipName: fileName,zipPassword:newPassword};
        } catch (error) {
            updateMintProgress?.('compressError',`Compression failed: ${error}`);
            throw error;
        } 
    };

    const compressFiles_noPassword = async (files: UploadFile[]): Promise<CompressResult_noPassword> => {
        updateMintProgress?.('isLoading',true)
        try {
            // Has files 
            if (files.length === 0) {
                throw new Error('No file!');
            }

            // Create a zip file
            const writer = new zip.ZipWriter(new zip.BlobWriter("application/zip"));

            // Add the file into zip
            for (const file of files) {
                if (file.originFileObj) {
                    const arrayBuffer = await file.originFileObj.arrayBuffer(); // get the file as an array buffer
                    // add the file to the zip file
                    await writer.add(file.name, new zip.Uint8ArrayReader(new Uint8Array(arrayBuffer)), {});
                }
            }

            // Close the zip
            const newZipBlob = await writer.close();

            const randomName = generateRandomFileName();
            const fileName = `${randomName}.zip`;
            saveAs(newZipBlob, fileName);
            updateCidPasswState?.('fileName',fileName)
            updateMintProgress?.('compressIsLoading',true)
            return { zipBlob: newZipBlob, zipName: fileName};
        } catch (error) {
            updateMintProgress?.('compressError',`Compression failed: ${error}`);
            throw error;
        } 
    };

    return { compressFiles,compressFiles_noPassword};
};
