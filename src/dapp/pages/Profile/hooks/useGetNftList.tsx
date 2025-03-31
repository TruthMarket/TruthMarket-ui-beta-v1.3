// import { 
//     useState, 
//     // useEffect 
// } from 'react';
import { NftDetailType } from '../../../type/contractDate';
import { useGetNftDetail } from '../../../hooks/useGetNftDetail';
// import { useNftListContext } from '../../../dappContext/nftList';
import { useGetTokenList } from './useGetTokenlist';
import { useDisplayContext } from '../context/displayContext';

// 处理NFT列表数据的自定义Hook
export const useGetNftList = () => {

    const { setLoadingMessage } = useDisplayContext() || {};
    const { getNftDetail } = useGetNftDetail();
    // const { updateNftList, updateErrorList } = useNftListContext() || {};
    const {getTokenList} = useGetTokenList();

    const getNftList = async (currentPage: number, pageSize: number, currentTab:string) => {
        let nftList: NftDetailType[] = [];
        // 获取当前页的tokenId列表
        const tokenList = await getTokenList(currentPage, pageSize, currentTab);
        if (tokenList.length === 0) {
            return;
        }
        console.log('tokenList:',tokenList);
        try {
            setLoadingMessage?.('Loading...');
            let error = 0, success = 0;

            // 遍历处理每个tokenId
            for (const tokenId of tokenList) {
                const nftDetail= await getNftDetail(tokenId);
                if (nftDetail) {
                    nftList.push(nftDetail);
                    success++;
                } else {
                    error++;
                }
                // console.log('tokenId:',tokenId); // ok
                setLoadingMessage?.( `loaded ${success} , ${error} failed. total: ${tokenList.length}`);
            }
            
        } catch (error) {
            console.error('NFT list loading error:', error);
            setLoadingMessage?.( 'loading error! Please try again');
        }

        return nftList;
    };

    return {getNftList};
}; 