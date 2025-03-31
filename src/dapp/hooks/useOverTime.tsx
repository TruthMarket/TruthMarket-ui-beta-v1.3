// import { useState, useEffect } from 'react';
/*
export const useOverTime = () => {
    const THREE_MINUTES = 3 * 60 * 1000; // 3分钟转换为毫秒

    const isOverTime = (timestamp: number, minutes?: number): boolean => {
        const currentTime = Date.now(); // 毫秒
        let theMinutes:number;
        if(minutes){
            theMinutes = minutes * 60 * 1000;
        } else {
            theMinutes = THREE_MINUTES;

        }
        // 判断时间戳是否已经是毫秒格式
        // 通常秒级时间戳是10位，毫秒级时间戳是13位
        const targetTime = timestamp.toString().length >= 13
            ? Number(timestamp)
            : Number(timestamp) * 1000;

        const timeDifference =  currentTime - targetTime;

        const isOver = timeDifference > theMinutes;

        return isOver;

    };

    return {isOverTime};
};
*/
// 用于判断是否要重新读取合约的时间限。