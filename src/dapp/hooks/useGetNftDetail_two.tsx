////@ts-nocheck
import { useContext } from 'react';
// import { useAccount } from 'wagmi';
// import { useNftDetailTwoContext } from '../dappContext/nftDetailTwo';
// import { useNftDetailContext } from '../pages/NftDetail/useState/nftDetail';
import { ContractContext } from '../context';
import { blackList_let,useNftListContext } from '../dappContext/nftList';

export interface TypeDetail_two {
    isBlackTokenId: boolean;
    purchaseTimestamp: number;
    deliveryTimestamp: number;
    refundPermit: boolean;
    refundRequestTimestamp: number;
    inReviewDeadline: boolean;
    inRefundDeadline: boolean;
}

interface GetNftDetailResult {
    getNftDetail_two: (tokenId: number) => Promise<TypeDetail_two>;
}

export const useGetNftDetail_two = (): GetNftDetailResult => {
    // const { address } = useAccount();
    const {
        purchaseTimestamp,
        refundRequestTimestamp,
        inRefundDeadline,
        deliveryTimestamp,
        inReviewDeadline,
        refundPermit,
        isBlackTokenId
    } = useContext(ContractContext);

    const {addBlackList,removeBlackList} = useNftListContext()


    const getNftDetail_two = async (tokenId: number) => {
        console.log('getNftDetail_two tokenId:', tokenId);

        try {
            const [
                isBlack_TokenId,
                purchase_Timestamp,
                refund_Permit,
                requestRefund_Time
            ] = await Promise.all([
                isBlackTokenId(tokenId),
                purchaseTimestamp(tokenId),
                refundPermit(tokenId),
                refundRequestTimestamp(tokenId)
            ]);

            let deliver_Timestamp = 0;
            let inReview_Deadline = false;
            let inRefund_deadline = false;

            // 只在必要时获取额外数据
            if (purchase_Timestamp > 0) {
                deliver_Timestamp = await deliveryTimestamp(tokenId);
            }

            if (requestRefund_Time > 0) {
                inReview_Deadline = await inReviewDeadline(tokenId);
            } else if (deliver_Timestamp > 0) {
                inRefund_deadline = await inRefundDeadline(tokenId);
            }

            if (isBlack_TokenId) {
                // 如果黑名单列表中没有，则添加
                if (!blackList_let.includes(tokenId)) {
                    addBlackList(tokenId)
                }
            } else {
                // 如果黑名单列表中有，则删除
                if (blackList_let.includes(tokenId)) {
                    removeBlackList(tokenId)
                }
            }

            // 构建更新数据对象
            const updateData = {
                isBlackTokenId: isBlack_TokenId,
                purchaseTimestamp: purchase_Timestamp,
                deliveryTimestamp: deliver_Timestamp,
                refundPermit: refund_Permit,
                refundRequestTimestamp: requestRefund_Time,
                inReviewDeadline: inReview_Deadline,
                inRefundDeadline: inRefund_deadline
            };

            console.log('Updated data:', {
                deliver_Timestamp,
                refund_Permit,
                isBlack_TokenId,
                purchase_Timestamp,
                requestRefund_Time,
                inReview_Deadline,
                inRefund_deadline
            });

            return updateData;
        } catch (error) {
            console.error('getNftDetail_two error:', error);
            throw error;
        }
    };

    return { getNftDetail_two };
};
