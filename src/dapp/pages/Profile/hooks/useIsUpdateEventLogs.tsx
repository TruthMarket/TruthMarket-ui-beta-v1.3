
/*
import { useOverTime } from "../../../hooks/useOverTime";
// import { useAccount } from "wagmi";
// import { useEventContext } from "../context/eventListContext";
import { useRecodeContext } from '../../../dappContext/recodeContext';

export const useIsUpdateEventLogs = ()=>{
    const {isOverTime} = useOverTime()
    const {eventRecodeList}= useRecodeContext()||{};

    const isUpdateEventLogs = (address:string):boolean=>{
        if (!eventRecodeList) return true;
        const record = eventRecodeList.find(item => item.address === address);
        
        if (!record) return true;

        // const currentTime = Math.floor(Date.now() / 1000); // 当前时间戳（秒）
        // const timeDiff = currentTime - record.timestamp; // 时间差（秒）
        // const fiveMinutes = 5 * 60; // 5分钟（秒）

        const isOver = isOverTime(record.timestamp,5)

        return isOver;
    }

    return {isUpdateEventLogs};

}

*/