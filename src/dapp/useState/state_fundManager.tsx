import { useState, } from 'react';
// import { Uint256_bytes } from '../type/readContracts';
// import { ethers} from 'ethers';

// 返回单个数据的函数列表
export const functions_singleOutput = [
    // 'Implementation',
    'Admin',
    "allocatedFunds",
    "bidIncrementRate",
    "completeFeeRate",
    "isPauseWithdraw",
    "sellerFeeRate",
    "serviceFeeRate",
    "totalIncome",
    "totalOrderMoney",
    "unallocatedFunds",
]
// 返回一个数组的函数列表
export const functions_arrayOutput = [
    'tokenIdArray',
]

// export const all = [
//     "Admin",
//     "Implementation",
//     "Income",
//     "addAdminFeeRate",
//     "addBuyerFeeRate",
//     "addCompleter",
//     "adminFeeRate",
//     "allocatedFunds",
//     "bidIncrementRate",
//     "buyerFeeRate",
//     "changeAdmin",
//     "completeFeeRate",
//     "completer",
//     "incomeAmount",
//     "minterIncome",
//     "orderMoney",
//     "isPauseWithdraw",
//     "receiveOrderMoney",
//     "receiveSecretMoney",
//     "receiveServiceFee",
//     "refundPermission",
//     "sellerFeeRate",
//     "serviceFeeRate",
//     "setAddress",
//     "setBidGain",
//     "setCompleteFeeRate",
//     "setRefundPermission",
//     "setSellerFeeRate",
//     "setServiceFeeRate",
//     "togglePauseWithdraw",
//     "totalIncome",
//     "totalOrderMoney",
//     "unallocatedFunds",
//     "upgrade",
//     "withdrawBatch",
//     "withdrawMinter",
//     "withdrawRefund",
//     "withdrawServiceFee",
// ]

// 在文件顶部定义自定义 hook
export interface StateType_fundManager {
    // Implementation: string,
    Admin: string,
    allocatedFunds: string,
    bidIncrementRate: string,
    completeFeeRate: string,
    isPauseWithdraw: string,
    sellerFeeRate: string,
    serviceFeeRate: string,
    totalIncome: string,
    totalOrderMoney: string,
    unallocatedFunds: string,
}

export interface StateTypeList_fundManager {
    tokenIdArray: number[];
}

export let currentState: StateType_fundManager = {
    // Implementation: '',
    Admin: '',
    allocatedFunds: '',
    bidIncrementRate: '',
    completeFeeRate: '',
    isPauseWithdraw: '',
    sellerFeeRate: '',
    serviceFeeRate: '',
    totalIncome: '',
    totalOrderMoney: '',
    unallocatedFunds: '',
}

// 在文件顶部定义自定义 hook
export const useState_fundManager = () => {
    const [state, setState] = useState<StateType_fundManager>({
        // Implementation: '',
        Admin: '',
        allocatedFunds: '',
        bidIncrementRate: '',
        completeFeeRate: '',
        isPauseWithdraw: '',
        sellerFeeRate: '',
        serviceFeeRate: '',
        totalIncome: '',
        totalOrderMoney: '',
        unallocatedFunds: '',
    });

    const updateState = (key: keyof StateType_fundManager, value: string) => {
        // setState(prevState => ({ ...prevState, [key]: value }));
        setState(prevState => {
            const newState = { ...prevState, [key]: value };
            // 更新let变量
            currentState = newState;
            return newState;
        });
    };

    // 新增：返回状态对象的键
    // const stateKeys = Object.keys(state) as (keyof StateType_fundManager)[];

    const [stateList, setStateList] = useState<StateTypeList_fundManager>({
        tokenIdArray: [],
    });


    const updateStateList = (key: keyof StateTypeList_fundManager, value: any[]) => {
        setStateList(prevState => ({ ...prevState, [key]: value }));
    };

    return { state, updateState, stateList, updateStateList };
}

// export function useInputState() {
//     const [inputs, setInputs] = useState({});

//     const updateInput = (key: string, value: string) => {
//         setInputs(prev => ({ ...prev, [key]: value }));
//     };

//     return [inputs, updateInput] as const;
// }