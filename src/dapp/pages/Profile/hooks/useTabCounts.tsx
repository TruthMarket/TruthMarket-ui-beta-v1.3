
/*
// import { useState, useEffect } from 'react';
import { useEventContext } from '../context/eventListContext';


// 处理总数据量的自定义Hook
export const useTotalItems = () => {
    const { tabCounts } = useEventContext() || {};

    const totalItems = (currentTab: string) => {
        let totals = 0;
        // 根据当前标签页更新总数据量
        switch (currentTab) {
            case 'minter':
                totals = tabCounts?.minter || 0;
                break;
            case 'buyer':
                totals = tabCounts?.buyer || 0;
                break;
            case 'bidder':
                totals = tabCounts?.bidder || 0;
                break;
            case 'completer':
                totals = tabCounts?.completer || 0;
                break;
            default:
                totals = 0;
        }
        return totals;
    };

    return totalItems;
}; 
*/