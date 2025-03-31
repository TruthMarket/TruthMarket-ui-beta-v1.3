import { useEffect, useState } from 'react';
import { Config_feeToken } from "../../constants/abiAddress_v1_2";
// import { useState_feeToken } from "../../useState/state_feeToken";
import { useReadContract } from 'wagmi';

export function allowance(owner: string, spender: string) {
    const { data, isError } = useReadContract({
        ...Config_feeToken,
        functionName: 'allowance',
        args: [owner, spender]
    });

    const [datas, setDatas] = useState<number  | null>(null)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            // console.log('read feeToken allowance :',counts); ok
            setDatas(counts)
        } else if (isError) {
            console.log('read feeToken allowance error!')
        }
    }, [data, isError]);

    return datas;
};

export function balanceOf(account: string) {
    const { data, isError } = useReadContract({
        ...Config_feeToken,
        functionName: 'balanceOf',
        args: [account]
    });

    const [datas, setDatas] = useState<number  | null>(null)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read feeToken balanceOf error!')
        }
    }, [data, isError]);

    return datas;
};

export function decimals() {
    const { data, isError } = useReadContract({
        ...Config_feeToken,
        functionName: 'decimals'
    });

    const [datas, setDatas] = useState<number  | null>(null)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read feeToken balanceOf error!')
        }
    }, [data, isError]);

    return datas;
};

export function mintDate(address: string) {
    const { data, isError } = useReadContract({
        ...Config_feeToken,
        functionName: 'mintDate',
        args: [address]
    });

    const [datas, setDatas] = useState<number  | null>(null)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read feeToken mintDate error!')
        }
    }, [data, isError]);

    return datas;
};

export function mintDeadline() {
    const { data, isError } = useReadContract({
        ...Config_feeToken,
        functionName: 'mintDeadline'
    });

    const [datas, setDatas] = useState<number  | null>(null)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read feeToken mintDeadline error!')
        }
    }, [data, isError]);

    return datas;
};

export function name() {
    const { data, isError } = useReadContract({
        ...Config_feeToken,
        functionName: 'name'
    });
    
    const [datas, setDatas] = useState<string | null>(null)

    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read feeToken name error!')
        }
    }, [data, isError]);

    return datas;
};

export function symbol() {
    const { data, isError } = useReadContract({
        ...Config_feeToken,
        functionName: 'symbol'
    });
    
    const [datas, setDatas] = useState<string | null>(null)

    useEffect(() => {
        if (data) {
            const counts = data.toString();
            setDatas(counts)
        } else if (isError) {
            console.log('read feeToken symbol error!')
        }
    }, [data, isError]);

    return datas;
};

export function totalSupply() {
    const { data, isError } = useReadContract({
        ...Config_feeToken,
        functionName: 'totalSupply'
    });
    
    const [datas, setDatas] = useState<number  | null>(null)
    useEffect(() => {
        if (data) {
            const counts = parseInt(data.toString());
            setDatas(counts)
        } else if (isError) {
            console.log('read feeToken totalSupply error!')
        }
    }, [data, isError]);

    return datas;
};
