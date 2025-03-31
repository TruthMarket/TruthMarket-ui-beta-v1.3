// import React,{ useCallback } from 'react';
import { useBoxInfoContext } from '../useState/boxInfo';
import { AddTime } from '@dapp/utils/time'

export const useSetTime = () => {
    const {boxInfoState,updateBoxInfo} = useBoxInfoContext() || {};
    const dateTime = AddTime();

    const executeSetTime = async () => {
        const createDate = dateTime();
        const time = `${Date.now()}`

        updateBoxInfo?.("createDate",createDate);
        updateBoxInfo?.('timestamp',time);

        const jsonCopy = {
            ...boxInfoState,
            createDate:createDate,
            time:time,
        }
        
        return jsonCopy;
    };

    return executeSetTime;
};