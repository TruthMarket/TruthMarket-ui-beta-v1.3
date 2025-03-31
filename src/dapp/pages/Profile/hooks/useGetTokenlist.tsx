////@ts-nocheck
// import { useState, useEffect } from 'react';
import { blackList_let } from "../../../dappContext/nftList";
// import { useEventContext } from '../context/eventListContext';
import { useEventDataContext } from "../../../dappContext/eventDataContext";
import { useAccount } from "wagmi";

export const useGetTokenList = () => {
    const {address}=useAccount();
    const { getBuyerList, getBidderList, getCompleterList, getMinterList } = useEventDataContext();

    const getTokenList= async (current: number, pageSize: number, currentTab:string): Promise<number[]> => {
        let selectedList: number[] = [];
        if(!address) return [];
        switch (currentTab) {
            case 'buyer':
                selectedList = getBuyerList(address) ?? [];
                break;
            case 'bidder':
                selectedList = getBidderList(address) ?? [];
                break;
            case 'completer':
                selectedList = getCompleterList(address) ?? [];
                break;
            case 'minter':
                selectedList = getMinterList(address) ?? [];
                break;
            default:
                selectedList = [];
        }

        // 调整start和end，跳过blackList中的错误ID
        const adjustedIndices = selectedList.filter(id => !blackList_let.includes(id));

        let start = (current - 1) * pageSize;
        let end = Math.min(current * pageSize, adjustedIndices.length);
        console.log('start:',start,'end:',end);
        const slicedResult = adjustedIndices.slice(start, end);
        // 去重复
        const uniqueResult = [...new Set(slicedResult)];
        return uniqueResult;
    }

    return {getTokenList};
};
