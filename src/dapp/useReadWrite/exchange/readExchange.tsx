import { useEffect, useState } from 'react';

import { Config_Exchange } from "../../constants/abiAddress_v1_3";

import { useReadContract } from 'wagmi';



// Admin函数保持不变

export function Admin() {

    const { data, isError } = useReadContract({
        ...Config_Exchange,
        functionName: 'Admin'
    });

    const [datas, setDatas] = useState<string>('')
    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read exchange Admin error!')
        }
    }, [data, isError]);

    return datas;
};


// export function PublicKey_buyer(tokenId: number) {

//     const { data, isError } = useReadContract({
//         ...Config_Exchange,
//         functionName: 'PublicKey_buyer',
//         args: [tokenId]
//     });

//     const [datas, setDatas] = useState<string>('')

//     useEffect(() => {
//         if (data) {
//             const counts = data.toString();
//             setDatas(counts)
//         } else if (isError) {
//             console.error('read exchange PublicKey_buyer error!')
//         }
//     }, [data, isError]);

//     return datas;
// };

export function buyerOf(tokenId: number) {

    const { data, isError } = useReadContract({
        ...Config_Exchange,
        functionName: 'buyerOf',
        args: [tokenId]
    });

    const [datas, setDatas] = useState<string>('')

    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read exchange buyerOf error!')
        }
    }, [data, isError]);

    return datas;

};

export function calcPayMoney(tokenId: number) {

    const { data, isError } = useReadContract({
        ...Config_Exchange,
        functionName: 'calcPayMoney',
        args: [tokenId]
    });

    const [datas, setDatas] = useState<number >(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read exchange calcPayMoney error!')
        }
    }, [data, isError]);

    return datas;
};

export function deliveryPeriod() {

    const { data, isError } = useReadContract({
        ...Config_Exchange,
        functionName: 'deliveryPeriod'
    });

    const [datas, setDatas] = useState<number >(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read exchange deliveryPeriod error!')
        } 
    }, [data, isError]);

    return datas;
};


export function deliveryTimestamp(tokenId: number) {

    const { data, isError } = useReadContract({
        ...Config_Exchange,
        functionName: 'deliveryTimestamp',
        args: [tokenId]
    });

    const [datas, setDatas] = useState<number >(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read exchange deliveryTimestamp error!')
        } 
    }, [data, isError]);

    return datas;
};


export function inRefundDeadline(tokenId: number) {

    const { data, isError } = useReadContract({
        ...Config_Exchange,
        functionName: 'inRefundDeadline',
        args: [tokenId]
    });

    const [datas, setDatas] = useState<boolean>(false)

    useEffect(() => {
        if (typeof data === 'boolean') {
            setDatas(data)
        } else if (isError) {
            setDatas(false);
        }
    }, [data, isError]);

    return datas;
};


export function inReviewDeadline(tokenId: number) {

    const { data, isError } = useReadContract({
        ...Config_Exchange,
        functionName: 'inReviewDeadline',
        args: [tokenId]
    });

    const [datas, setDatas] = useState<boolean>(false)
    useEffect(() => {
        if (typeof data === 'boolean') {
            setDatas(data)
        } else if (isError) {
            setDatas(false);
        }
    }, [data, isError]);

    return datas;
};


export function purchaseTimestamp(tokenId: number) {

    const { data, isError } = useReadContract({
        ...Config_Exchange,
        functionName: 'purchaseTimestamp',
        args: [tokenId]
    });

    const [datas, setDatas] = useState<number >(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read exchange purchaseTimestamp error!')
        } 
    }, [data, isError]);

    return datas;
};

export function refundRequestPeriod() {
    const { data, isError } = useReadContract({
        ...Config_Exchange,
        functionName: 'refundRequestPeriod'
    });

    const [datas, setDatas] = useState<number >(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read exchange refundRequestPeriod error!')
        } 
    }, [data, isError]);

    return datas;
};


export function refundRequestTimestamp(tokenId: number) {
    const { data, isError } = useReadContract({
        ...Config_Exchange,
        functionName: 'refundRequestTimestamp',
        args: [tokenId]
    });

    const [datas, setDatas] = useState<number >(0)
    useEffect(() => {
        // console.log('data:', data)
        if (data) {
            const counts = parseInt(data.toString());
            console.log('counts:', counts)
            setDatas(counts)
        } else if (isError) {
            console.log('read exchange refundRequestTimestamp error!')
        } 
    }, [data, isError]);

    return datas;
};


export function refundReviewPeriod() {
    const { data, isError } = useReadContract({
        ...Config_Exchange,
        functionName: 'refundReviewPeriod'
    });

    const [datas, setDatas] = useState<number >(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read exchange refundReviewPeriod error!')
        } 
    }, [data, isError]);

    return datas;
};

// export function sellerOf(tokenId: number) {

//     const { data, isError } = useReadContract({
//         ...Config_Exchange,
//         functionName: 'sellerOf',
//         args: [tokenId]
//     });

//     const [datas, setDatas] = useState<string>('')
//     useEffect(() => {
//         if (data) {
//             const counts = data.toString();
//             setDatas(counts)
//         } else if (isError) {
//             console.log('read exchange sellerOf error!')
//         }
//     }, [data, isError]);

//     return datas;
// };

export function completerOf(tokenId: number) {

    const { data, isError } = useReadContract({
        ...Config_Exchange,
        functionName: 'completerOf',
        args: [tokenId]
    });

    const [datas, setDatas] = useState<string>('')
    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read exchange completerOf error!')
        }
    }, [data, isError]);

    return datas;
};

