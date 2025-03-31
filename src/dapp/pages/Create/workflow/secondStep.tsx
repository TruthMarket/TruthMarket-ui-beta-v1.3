// import React, { useCallback } from 'react';
// import { useJsonContext } from '@provider/JsonProvider';
import { uploadToIPFS } from '@dapp/utils/upload/uploadToIPFS';
import { useNftFormContext} from '../useState/nftForm';
import { useProgressContext } from '../useState/progress';
// import createNftImageOld from '@dapp/utils/objToImage/objToImage';
import CreateNftImage from '@dapp/utils/createNftImage';
import nftBackgroundImage from '@assets/nft/nftBackground.jpg'
import { objToJson} from '@dapp/utils/toJsonFile/objToJson';
import { CreateNftData } from '../utils/createNftData';
// 导入metadata模板
import metadataTemplate from '../json/metadata.json';

// interface FirstStepResult {
//     fileCID:string| null | undefined;
//     imageCID: string| null | undefined;
// }

export const useSecondStep = () => {
    const { 
        // formState,
        updateNftForm
    } = useNftFormContext()||{};
    const { updateMintProgress } = useProgressContext()||{};

    const executeSecondStep = async (jsonState: any) => {
        const time = jsonState.time;
        // Create a jsonState duplicate
        const jsonStateCopy = { ...jsonState };
        delete jsonStateCopy.fileCID;
        delete jsonStateCopy.time;
        delete jsonStateCopy.password;
        // let jsonCid;
        // let urlCid;
        try {
            if (jsonStateCopy) {
                const truthBoxInfo_json = objToJson(jsonStateCopy, time ?? '');
                if (truthBoxInfo_json) { // Ensure truthBoxInfo_json is not null
                    const CID = await uploadToIPFS(truthBoxInfo_json, (progress) => {
                        updateMintProgress?.('upload_JsonProgress', progress);
                    });
                    // console.log('JSON uploaded to IPFS，CID:', CID);
                    updateNftForm?.('infoCID', CID);
                    updateMintProgress?.('upload_JsonIsLoading', true);
                    // jsonCid=CID;
                } else {
                    // Handle the case where truthBoxInfo_json is null
                    // console.error('truthBoxInfo_json is null');
                    updateMintProgress?.('upload_JsonError', 'truthBoxInfo_json is null');
                }
            } else {
                updateMintProgress?.('upload_JsonError', 'json date is null');
            }
        } catch (error) {
            // console.error('upload json to IPFS failed:', error);
            updateMintProgress?.('upload_JsonError', `failed:${error}`);
            throw error;
        }

        //------
        const nftObjData = CreateNftData(jsonStateCopy);
        // Upload NFT Image and metadata to ipfs
        try {
            const {file:image_metadata} = await CreateNftImage(nftObjData, time ?? '',nftBackgroundImage);

            const CID_image = await uploadToIPFS(image_metadata, (progress) => {
                updateMintProgress?.('upload_UrlProgress', progress);
            });

            // 将CID_image添加至metadata.json并上传
            try {
                // 创建metadata副本并只更新image字段
                const metadata = { ...metadataTemplate };
                metadata.image = `ipfs://${CID_image}`;
                metadata.boxInfo.imageIPFS = CID_image;
                
                // 转换为JSON字符串
                const metadataJSON = JSON.stringify(metadata, null, 2);
                
                // 创建File对象
                const metadataFile = new File([metadataJSON], "metadata.json", { type: 'application/json' });
                
                // 上传metadata.json到IPFS
                const CID_tokenURI = await uploadToIPFS(metadataFile, (progress) => {
                    updateMintProgress?.('upload_JsonProgress', progress);
                });
                
                // console.log('metadata.json uploaded to IPFS, CID:', CID_tokenURI);
                updateNftForm?.('tokenURI', CID_tokenURI);
                updateMintProgress?.('upload_JsonIsLoading', true);
            } catch (error) {
                // console.error('Upload metadata to IPFS failed:', error);
                updateMintProgress?.('upload_JsonError', `metadata upload failed:${error}`);
                throw error;
            }

            // console.log('url image uploaded to IPFS，CID:', CID_tokenURI);
            updateMintProgress?.('upload_UrlIsLoading', true);
            // urlCid=CID;
        } catch (error) {
            // console.error('upload url-image to IPFS failed:', error);
            updateMintProgress?.('upload_UrlError', `failed:${error}`);
            throw error;
        }


    };

    return executeSecondStep;
};