////@ts-nocheck
// import { useContext } from 'react';
// import { useAccount } from 'wagmi';
import { useNftDetailTwoContext } from '../../../dappContext/nftDetailTwo';
import { useNftDetailContext } from '../useState/nftDetail';
import { useGetNftDetail_two } from '../../../hooks/useGetNftDetail_two';
// import { ContractContext } from '../../../context';

interface UpdateNftTwoType {
    updateNftTwo: (tokenId: number, isCheck:checkType) => Promise<void>;
}

type checkType = 'check'|'noCheck';

export const useUpdateNftTwo = (): UpdateNftTwoType => {
    const { getNftDetail_two } = useGetNftDetail_two();
    // 导入 nftDetailTwo context 的相关函数
    const {
        getNftDetail,
        updateNftDetail,
        checkTokenIdExpired
    } = useNftDetailTwoContext();

    // 导入页面级 context
    const { updateNftDetail_two } = useNftDetailContext() || {};

    const updateNftTwo = async (tokenId: number, isCheck:checkType) => {

        // 检查缓存数据是否过期
        let isExpired : boolean = true;
        if (isCheck === 'check') {
            isExpired = checkTokenIdExpired(tokenId);
        } 
        const cachedData = getNftDetail(tokenId);

        // 如果数据未过期且存在，直接使用缓存数据
        if (!isExpired && cachedData) {
            console.log('Using cached data for tokenId:', tokenId);
            // 更新页面级 context
            Object.entries(cachedData).forEach(([key, value]) => {
                updateNftDetail_two?.(key as keyof typeof cachedData, value);
            });
            return;
        }

        // 如果数据过期或不存在，重新获取数据
        const data = await getNftDetail_two(tokenId)

        const {
            isBlackTokenId: isBlack_TokenId,
            purchaseTimestamp: purchase_Timestamp,
            deliveryTimestamp: deliver_Timestamp,
            refundPermit: refund_Permit,
            refundRequestTimestamp: requestRefund_Time,
            inReviewDeadline: inReview_Deadline,
            inRefundDeadline: inRefund_deadline
        } = data

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

        // 更新 dapp context 缓存
        updateNftDetail(tokenId, updateData);

        // 更新页面级 context
        Object.entries(updateData).forEach(([key, value]) => {
            updateNftDetail_two?.(key as keyof typeof updateData, value);
        });

    };

    return { updateNftTwo };
};
