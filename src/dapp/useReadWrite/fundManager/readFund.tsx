import { useEffect,useState } from 'react';
import { Config_FundManager } from "../../constants/abiAddress_v1_3";
// import { useState_fundManager } from "../../useState/state_fundManager";
import { useReadContract } from 'wagmi';

// FeeRate 合约函数
export function Admin() {
    const { data,isError} = useReadContract({
        ...Config_FundManager,
        functionName: 'Admin'
    });
    const [datas, setDatas] = useState<string>('')
    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read fundManager Admin error!')
        }
    }, [data, isError]);

    return datas;
};

export function Implementation() {

    const { data, isError } = useReadContract({
        ...Config_FundManager,
        functionName: 'Implementation'
    });

    const [datas, setDatas] = useState<string>('')
    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read fundManager Implementation error!')
        }
    }, [data, isError]);

    return datas;
};

export function adminFeeRate(tokenId: number) {
    const { data, isError } = useReadContract({
        ...Config_FundManager,
        functionName: 'adminFeeRate',
        args: [tokenId]
    });
    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read fundManager adminFeeRate error!')
        }
    }, [data, isError]);

    return datas;
}

export function buyerFeeRate(tokenId: number) {
    const { data, isError } = useReadContract({
        ...Config_FundManager,
        functionName: 'buyerFeeRate',
        args: [tokenId]
    });
    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read fundManager buyerFeeRate error!')
        }
    }, [data, isError]);

    return datas;
}

export function completerRewardRate() {
    const { data, isError } = useReadContract({
        ...Config_FundManager,
        functionName: 'completerRewardRate'
    });
    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read fundManager completerRewardRate error!')
        }
    }, [data, isError]);

    return datas;
}


export function bidIncrementRate() {
    const { data, isError } = useReadContract({
        ...Config_FundManager,
        functionName: 'bidIncrementRate'
    });
    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read fundManager bidIncrementRate error!')
        }
    }, [data, isError]);

    return datas;
}

export function publicRewardRate() {
    const { data, isError } = useReadContract({
        ...Config_FundManager,
        functionName: 'publicRewardRate'
    });
    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read fundManager publicRewardRate error!')
        }
    }, [data, isError]);

    return datas;
}

export function serviceFeeRate() {
    const { data, isError } = useReadContract({
        ...Config_FundManager,
        functionName: 'serviceFeeRate'
    });
    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read fundManager serviceFeeRate error!')
        }
    }, [data, isError]);

    return datas;
}

// FundManager 合约函数
export function orderAmount(tokenId: number, address: string) {
    const { data, isError } = useReadContract({
        ...Config_FundManager,
        functionName: 'orderAmount',
        args: [tokenId, address]
    });
    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read fundManager orderAmount error!')
        }
    }, [data, isError]);

    return datas;
}

export function refundPermit(tokenId: number) {
    const { data, isError } = useReadContract({
        ...Config_FundManager,
        functionName: 'refundPermit',
        args: [tokenId]
    });
    const [datas, setDatas] = useState<boolean>(false)

    useEffect(() => {
        if (typeof data === 'boolean') {
            setDatas(data)
        } else if (isError) {
            console.log('read fundManager refundPermit error!')
        }
    }, [data, isError]);

    return datas;
}

export function otherRewards(tokenId: number, address: string) {
    const { data, isError } = useReadContract({
        ...Config_FundManager,
        functionName: 'otherRewards',
        args: [tokenId, address]
    });
    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read fundManager otherRewards error!')
        }
    }, [data, isError]);

    return datas;
}


export function minterRewards(tokenId: number) {
    const { data, isError } = useReadContract({
        ...Config_FundManager,
        functionName: 'minterRewards',
        args: [tokenId]
    });
    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read fundManager minterRewards error!')
        }
    }, [data, isError]);

    return datas;
}

export function unallocatedFunds() {
    const { data, isError } = useReadContract({
        ...Config_FundManager,
        functionName: 'unallocatedFunds'
    });
    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read fundManager unallocatedFunds error!')
        }
    }, [data, isError]);

    return datas;
}

export function allocatedFunds() {
    const { data, isError } = useReadContract({
        ...Config_FundManager,
        functionName: 'allocatedFunds'
    });
    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read fundManager allocatedFunds error!')
        }
    }, [data, isError]);

    return datas;
}

// export function totalOrderMoney() {
//     const { data, isError } = useReadContract({
//         ...Config_FundManager,
//         functionName: 'totalOrderMoney'
//     });
//     const [datas, setDatas] = useState<number>(0)
//     useEffect(() => {
//         if (data) {
//             const counts = parseInt(data.toString());
//             setDatas(counts)
//         } else if (isError) {
//             console.log('read fundManager allocatedFunds error!')
//         }
//     }, [data, isError]);

//     return datas;
// }

export function totalRewards() {
    const { data, isError } = useReadContract({
        ...Config_FundManager,
        functionName: 'totalRewards'
    });
    const [datas, setDatas] = useState<number>(0)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read fundManager totalRewards error!')
        }
    }, [data, isError]);

    return datas;
}

export function isPauseWithdraw() {
    const { data, isError } = useReadContract({
        ...Config_FundManager,
        functionName: 'isPauseWithdraw'
    });
    const [datas, setDatas] = useState<boolean>(false)

    useEffect(() => {
        if (typeof data === 'boolean') {
            setDatas(data)
        } else if (isError) {
            console.log('read fundManager isPauseWithdraw error!')
        }
    }, [data, isError]);

    return datas;
}
