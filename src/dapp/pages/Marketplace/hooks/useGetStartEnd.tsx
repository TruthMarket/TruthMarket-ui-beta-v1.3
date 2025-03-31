////@ts-nocheck
// import { useState, useEffect, useCallback, useContext } from 'react';
// import { current_pageDate } from '../useState/marketPage';
// import { currentStatistics } from '../useState/statisticsData';
import { errorList_let } from "../../../dappContext/nftList";

export const useGetStartEnd = () => {


    const getStartEnd = async (current: number, pageSize: number, total: number): Promise<{ start: number; end: number }> => {

        let start = (current - 1) * pageSize;
        let endId = (current) * pageSize - 1;
        // 检查errorList中是否有元素的值小于start，如果有一个，start的值就+1，
        if (errorList_let.length > 0) {
            while (errorList_let.some(errorId => errorId < start)) {
                start++;
                endId++;
            }
        }

        const end = Math.min(endId, total - 1)
        console.log("start:", start, "end:", end);
        return { start, end };
    };

    return { getStartEnd };

};
