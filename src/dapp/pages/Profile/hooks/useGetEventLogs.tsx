

import { useState } from 'react';
// import { useAccount } from 'wagmi';
import { useWalletContext } from '../../../context/useAccount/WalletContext';
import {
    useBidderEvents,
    // useSellerEvents, 
    useBuyerEvents,
    useCompleterEvents
} from '../../../useReadWrite/exchange/eventExchange';
import { useTransferEvents } from '../../../useReadWrite/truthBox/eventTruthBox';
// import { TabCountsType, useEventContext } from '../context/eventListContext';
import { TabCountsType,useEventDataContext } from '../../../dappContext/eventDataContext';
// import { useDisplayContext } from '../context/displayContext';
// import { useRecodeContext } from '../../../dappContext/recodeContext';

export const useGetEventLogs = () => {
    const { publicClient } = useWalletContext();
    const {
        updateTabCounts,
        updateBuyerList,
        updateBidderList,
        updateCompleterList,
        updateMinterList,
        updateBlockNumber,
    } = useEventDataContext();


    const [eventCounts, setEventCounts] = useState<TabCountsType>({
        minter: 0,
        // seller: 0,
        buyer: 0,
        bidder: 0,
        completer: 0,
        total_Rewards: 0,
        unclaimed: 0,
    });
    const from = '0x0000000000000000000000000000000000000000';

    const transferEvents = useTransferEvents();

    const bidderEvents = useBidderEvents();
    // const sellerEvents = useSellerEvents();
    const buyerEvents = useBuyerEvents();
    const completerEvents = useCompleterEvents();

    const getEventLogs = async (address:string): Promise<TabCountsType> => {

        const fromBlock = await publicClient.getBlockNumber();

        updateBlockNumber(address,fromBlock)
        const minter_Events = await transferEvents(fromBlock,from, address)
        // 给状态更新一个缓冲时间
        await new Promise(resolve => setTimeout(resolve, 3000));
        const bidder_Events = await bidderEvents(fromBlock,address);
        await new Promise(resolve => setTimeout(resolve, 3000));
        // const seller_Events = await sellerEvents(address);
        const buyer_Events = await buyerEvents(fromBlock,address);
        await new Promise(resolve => setTimeout(resolve, 3000));
        const completer_Events = await completerEvents(fromBlock,address);

        // console.log('get minterEvents:',minterEvents)
        console.log('get bidderEvents:', bidder_Events)
        // console.log('get sellerEvents:',seller_Events)
        console.log('get buyerEvents:', buyer_Events)
        console.log('get completerEvents:', completer_Events)

        const minterList = minter_Events.map(item => item.tokenId);
        updateMinterList(address,minterList);
        // const sellerList = seller_Events.map(item => item.tokenId);
        // updateSellerList?.(sellerList);
        const completerList = completer_Events.map(item => item.tokenId);
        updateCompleterList(address,completerList);

        const bidderList = bidder_Events.map(item => item.tokenId);
        // 去重复
        const uniqueResult = [...new Set(bidderList)];
        updateBidderList(address,uniqueResult);

        const buyerList = buyer_Events.map(item => item.tokenId);
        // const mergedArray = bidderList.concat(buyerList);
        // const sortedArray = mergedArray.sort((a, b) => a - b);
        updateBuyerList(address,buyerList);

        const counts:TabCountsType = {
            minter: minterList.length,
            // seller: seller_Events.length,
            buyer: buyerList.length,
            bidder: uniqueResult.length,
            completer: completerList.length,
            total_Rewards: 0,
            unclaimed: 0,
        }
        setEventCounts(counts);
        updateTabCounts(address,counts);
        
        // 更新完毕！
        await new Promise(resolve => setTimeout(resolve, 300));

        return eventCounts;
    }
    return getEventLogs;
};
