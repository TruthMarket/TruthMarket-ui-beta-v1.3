/*
import {
    // useEffect,
    // useMemo,
    // useState,
    useContext
} from 'react';

import { ContractContext } from '../../context';
// import { tokenIdArray } from './readKeyCrypt';

// type returnType = string|null;

export const usePublicKey_office = () => {

    const {PublicKey_office, tokenIdIndex} = useContext(ContractContext);

    // const tokenIdList = tokenIdArray(); // [1,9,19,28....]

    const getPublicKey_office = async (tokenId: number): Promise<string> => {
        const tokenIdList = await tokenIdArray();
        // console.log('tokenIdList:',tokenIdList) // OK
        if (!tokenIdList) return '';

        const length = tokenIdList?.length || 1;
        let key_id: number = 1;
        if (length === 1) {
            key_id = 1;
        } else {
            // 检查tokenId处于什么位置,如果tokenId是13，那么就返回9.
            for (let i = 0; i < length; i++) {
                // 检查边界
                if (tokenId >= tokenIdList[i] && (i === length - 1 || tokenId < tokenIdList[i + 1])) {
                    key_id = tokenIdList[i];
                    break; // 找到后可以直接退出
                }
            }
        }

        const result = await PublicKey_office(key_id);
        // console.log('PublicKey_office_result:',result) // OK
        return result;
    }

    return { getPublicKey_office };

}
    */