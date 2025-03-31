////@ts-nocheck
import {
    // useState, 
    // useEffect, 
    // useCallback, 
    useContext
} from 'react';

// import { getBoxInfoList, isBlackTokenId } from "../../../function_gitter/nftBox/readData";
import { useGetNftDetail_one } from './useGetNftDetail_one';
import { NftDetailType } from "../type/contractDate";
// import { processBoxInfo } from '../utils/processBoxInfo';
import { ContractContext } from '../context';
import { recodeList_let, blackList_let, nft_marketList } from "../dappContext/nftList";
import { useNftListContext } from '../dappContext/nftList';
// import { isBlackTokenId } from '../useReadWrite/truthBox/readTruthBox';

// interface GetNftDetailResult {
//     getNftDetail: (tokenId: number) => Promise<
//         NftDetailType | null
//     >;
// }

export const useGetNftDetail = () => {
    const { isBlackTokenId } = useContext(ContractContext);
    const { getNftDetail_one } = useGetNftDetail_one();
    const { updateNftList, addErrorList,addBlackList} = useNftListContext();

    const getNftDetail = async (tokenId: number): Promise<NftDetailType | null> => {
        try {
            // 检查tokenId是否在recodeList数组中
            if (recodeList_let.includes(tokenId)) {
                // 检查nft_marketList数组中对应的tokenId是否有数据
                const existingNft = nft_marketList.find(nft => nft.tokenId === tokenId);
                if (existingNft) {
                    // console.log('existingNft tokenId:', tokenId);
                    return existingNft;
                }
            }
            if (blackList_let.includes(tokenId)) {
                return null;
            }
            // 如果上面的条件都不满足，执行以下操作
            // 间隔时间
            await new Promise(resolve => setTimeout(resolve, 300));
            const { nftDetail } = await getNftDetail_one(tokenId);
            // 判断是否加入错误名单
            if (!nftDetail) {
                const isBlack = await isBlackTokenId(tokenId);
                if (isBlack) {
                    addBlackList(tokenId)
                } else {
                    addErrorList(tokenId);
                }
                return null;
            }
            // 将数据更新至context
            updateNftList(nftDetail);
            return nftDetail;

        } catch (error) {
            console.error('Market list data update error:', error);
            return null;
        }
    }

    return { getNftDetail };
}
