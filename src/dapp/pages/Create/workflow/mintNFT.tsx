import {
    useEffect,
} from 'react';
// import { useNFTformContext } from "@provider/NFTformProvider";
// import { useUploadContext } from "@provider/UploadProvider";
import { nftForm_mint } from '../useState/nftForm';
import { filePassword_mint } from '../useState/keyCidPassword';
import { useProgressContext } from '../useState/progress';
// import { useClearData } from './clearData';

import {
    // type BaseError,
    useWaitForTransactionReceipt,
    useWriteContract
} from 'wagmi'
// import { feeToken_State } from '@useState/state_feeToken';
import { Config_TruthBox } from '@dapp/constants/abiAddress_v1_3';

export const useMint = () => {
    
    const { abi, address } = Config_TruthBox;
    const { writeContractAsync, data: hash, error, isPending } = useWriteContract()
    const { updateMintProgress } = useProgressContext()||{};

    const {
        // isLoading: isConfirming,
        isSuccess: isConfirmed,
    } = useWaitForTransactionReceipt({
        hash,
    })

    const executeMint = async () => {
        // console.log('Check nftForm_mint data：', nftForm_mint);
        const {
            radio,
            infoCID,
            tokenURI,
        } = nftForm_mint;

        const fileCid = filePassword_mint.fileCID;
        const password = filePassword_mint.password;

        try {
            let functionName: string;
            let args;
            if (radio === 'Storing') {
                // 将 price 转换为 uint256（考虑 decimals=3）
                // const priceInWei = parseUnits(price, feeToken_State.decimals);
                functionName = 'mint';
                args = [
                    infoCID,
                    tokenURI,
                ];
            } else if (radio === 'Public' && fileCid) {
                functionName = 'mintPublic';
                args = [
                    infoCID,
                    tokenURI,
                    fileCid,
                    password
                ];
            } else {
                console.error('radio data is error!');
                updateMintProgress?.('mint_NftError', 'radio data is error!')
                return;
            }
            
            const result = await writeContractAsync({
                address,
                abi,
                functionName,
                args,
            });
            
            console.log('Transaction hash:', result);
        } catch (error) {
            console.error('mint NFT failed:', error);
            updateMintProgress?.('mint_NftError', `${error}`)
            throw error;
        }
    };

    useEffect(() => {
        if (isPending) {
            updateMintProgress?.('mint_NftIsLoading', true)
        } else if (isConfirmed) {
            updateMintProgress?.('isComplete', true)
        } else if (error) {
            updateMintProgress?.('mint_NftError', 'mint failed')
        }
    }, [isPending, isConfirmed, error]);

    return executeMint;

}