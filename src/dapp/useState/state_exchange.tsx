import { useState, } from 'react';


// 返回单个数据的函数列表
export const functions_singleOutput = [
    // 'Implementation',
    'Admin',
    "confirmDeadline",
    "isPause",
    "refundDeadline",
    "reviewRefundDeadline",
]
// 返回一个数组的函数列表
export const functions_arrayOutput = [
    'tokenIdArray',
]

// 在文件顶部定义自定义 hook
export interface StateType_exchange {
    // Implementation: string;
    Admin: string;
    PublicKey_buyer:string,
    buyerOf:string,
    calcPayMoney:number,
    confirmDeadline:number,
    confirmTime:number,
    inRefundTime: string;
    inReviewRefundDeadline: string;
    isPause: boolean,
    purchaseTime:number,
    refundDeadline: number,
    requestRefundTime: number,
    reviewRefundDeadline: number,
    sellerOf:string,
}

// export interface StateTypeList_exchange {
//     tokenIdArray: number[];
// }

export let currentState: StateType_exchange = {
    // Implementation: '',
    Admin: '',
    PublicKey_buyer:'',
    buyerOf:'',
    calcPayMoney:0,
    confirmDeadline:0,
    confirmTime:0,
    inRefundTime: '',
    inReviewRefundDeadline: '',
    isPause: true,
    purchaseTime:0,
    refundDeadline: 0,
    requestRefundTime: 0,
    reviewRefundDeadline: 0,
    sellerOf:'',
}

// 在文件顶部定义自定义 hook
export const useState_exchange = () => {
    const [state, setState] = useState<StateType_exchange>(currentState);

    const updateState = (key: keyof StateType_exchange, value: string|number) => {
        // setState(prevState => ({ ...prevState, [key]: value }));
        setState(prevState => {
            const newState = { ...prevState, [key]: value };
            // 更新let变量
            currentState = newState;
            return newState;
        });
    };

    // 新增：返回状态对象的键
    // const stateKeys = Object.keys(state) as (keyof StateType_exchange)[];

    // const [stateList, setStateList] = useState<StateTypeList_exchange>({
    //     tokenIdArray: [],
    // });


    // const updateStateList = (key: keyof StateTypeList_exchange, value: any[]) => {
    //     setStateList(prevState => ({ ...prevState, [key]: value }));
    // };

    return { state, updateState, };
}
