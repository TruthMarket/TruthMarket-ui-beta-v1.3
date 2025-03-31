////@ts-nocheck
import { 
    // useState, 
    // useEffect, 
    // useCallback, 
    useContext 
} from 'react';

// import { getBoxInfoList, isBlackTokenId } from "../../../function_gitter/nftBox/readData";
// import { useState_MarketList } from "../useState/marketList";
import { NftDetailType } from "../type/contractDate";
import { processBoxInfo } from '../utils/processBoxInfo';
import { ContractContext } from '../context';

interface GetNftDetailResult {
    getNftDetail_one: (tokenId: number) => Promise<{
        nftDetail: NftDetailType | null;
        isError: boolean;
    }>;
}

export const useGetNftDetail_one = (): GetNftDetailResult => {
    const { getBoxInfo } = useContext(ContractContext);

    const getNftDetail_one = async (tokenId: number) => {
        try {
            // console.log('getNftDetail_one tokenId:',tokenId)
            const boxInfo = await getBoxInfo(tokenId);
            if (!boxInfo) return { nftDetail: null, isError: true };
            const nftDetail = await processBoxInfo(boxInfo);
            // console.log('get nftDetail:', nftDetail);
            // console.log('processing boxInfo:', boxInfo)
            return { nftDetail, isError: false };

        } catch (error) {
            console.error('Market list data update error:', error);
            return { nftDetail: null, isError: true };
        }
    }
    
    return { getNftDetail_one };
}
