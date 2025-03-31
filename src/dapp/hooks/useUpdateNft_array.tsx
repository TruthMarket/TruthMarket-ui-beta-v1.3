import { useGetNftDetail_one } from './useGetNftDetail_one';
import { useNftListContext } from '../dappContext/nftList';
import { useUpdateNftTwo } from '../pages/NftDetail/hooks/useUpdateNftTwo';
// import { useGetNftDetail_two } from './useGetNftDetail_two';
import { useNftDetailContext } from '../pages/NftDetail/useState/nftDetail';

interface UpdateNftResult {
    updateNft_array: (tokenIdArray: number[]) => void;
}

export const useUpdateNft_array = (): UpdateNftResult => {
    const { getNftDetail_one } = useGetNftDetail_one();
    // const { getNftDetail_two } = useGetNftDetail_two();
    const {updateNftTwo}=useUpdateNftTwo();
    const { nftDetail,updateNftDetail }= useNftDetailContext() || {};
    const { nftList, updateNftList, addErrorList } = useNftListContext() || {};

    const updateNft_array = async (tokenIdArray: number[]) => {
        // wait 50 seconds
        await new Promise(resolve => setTimeout(resolve, 50000)); 

        for (let i = 0; i < tokenIdArray.length; i++) {
            const tokenId = tokenIdArray[i];
            try {
                const { nftDetail:nft, isError } = await getNftDetail_one(tokenId);
                // 如果获取数据错误，就加入错误名单
                if (isError) {
                    addErrorList?.(tokenId);
                    continue;
                }

                if (nft) {
                    // 如果nftList中已存在该tokenId的数据，则替换它
                    const existingIndex = nftList?.findIndex(nft => nft.tokenId === tokenId);
                    console.log('updateNft index:', existingIndex);
                    if (existingIndex !== undefined && existingIndex >= 0) {
                        const updatedList = [...(nftList || [])];
                        updatedList[existingIndex] = nft;
                        console.log('updateNft tokenId:', nft.tokenId);
                        // 更新全局状态
                        updateNftList?.(nft);
                    } else {
                        // 如果不存在，找到合适的插入位置（按tokenId排序）
                        const insertIndex = nftList?.findIndex(nft => nft.tokenId > tokenId) ?? -1;
                        if (insertIndex === -1) {
                            // 如果没找到更大的tokenId，就添加到末尾
                            updateNftList?.(nft);
                        } else {
                            const updatedList = [...(nftList || [])];
                            updatedList.splice(insertIndex, 0, nft);
                            // 更新全局状态
                            updateNftList?.(nft);
                        }
                    }
                    // 更新详情页的nft详情
                    if (nft.tokenId === nftDetail?.tokenId) {
                        updateNftDetail?.(nft);
                        await updateNftTwo(tokenId,'noCheck'); // 不检查，直接更新
                    }
                }

            } catch (error) {
                console.error('Update NFT detail error:', error);
                continue;
            }
        }

    };

    return { updateNft_array };
};

// 在其他组件中使用
// const { updateNft_Array } = useUpdateNft();

// const handleUpdate = async (tokenId: number) => {
//     const { nft, isError } = await updateNft_Array(tokenId);
//     if (isError) {
//         console.error('Failed to update NFT');
//     } else {
//         console.log('NFT updated successfully:', nft);
//     }
// };