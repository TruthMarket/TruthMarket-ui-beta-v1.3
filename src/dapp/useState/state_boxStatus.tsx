import { useState, } from 'react';
// import { Uint256_bytes } from '../type/readContracts';
// import { ethers} from 'ethers';

// 返回单个数据的函数列表
// export const functions_singleOutput = [
//     // 'Implementation',
//     'Admin',
//     "totalCounts",
// ]
// 返回一个数组的函数列表

// export const all = [
//     "Admin",
//     "Auction",
//     "AuctionOverTime",
//     "Bidding",
//     "Buy",
//     "Completed",
//     "Completed2",
//     "Confirming",
//     "Implementation",
//     "Sell",
//     "SellOverTime",
//     "agreeRefund",
//     "agreeRefund2",
//     "cancelRefund",
//     "changeAdmin",
//     "refuseRefund",
//     "requestRefund",
//     "setAddress",
//     "tokenInBlackList",
//     "totalCounts",
//     "upgrade",
// ]

// 在文件顶部定义自定义 hook
export interface StateType_boxStatus {
    // Implementation: string;
    Admin: string;
    totalCounts: number;
}

// export interface StateTypeList_boxStatus {
//     tokenIdArray: number[];
// }

export let currentState: StateType_boxStatus = {
    // Implementation: '',
    Admin: '',
    totalCounts: 0,
}

// 在文件顶部定义自定义 hook
export const useState_boxStatus = () => {
    const [state, setState] = useState<StateType_boxStatus>({
        // Implementation: '',
        Admin: '',
        totalCounts: 0,
    });

    const updateState = (key: keyof StateType_boxStatus, value: string | number) => {
        // setState(prevState => ({ ...prevState, [key]: value }));
        setState(prevState => {
            const newState = { ...prevState, [key]: value };
            // 更新let变量
            currentState = newState;
            return newState;
        });
    };

    // const [stateList, setStateList] = useState<StateTypeList_boxStatus>({
    //     tokenIdArray: [],
    // });


    // const updateStateList = (key: keyof StateTypeList_boxStatus, value: any[]) => {
    //     setStateList(prevState => ({ ...prevState, [key]: value }));
    // };

    return { state, updateState};
}
