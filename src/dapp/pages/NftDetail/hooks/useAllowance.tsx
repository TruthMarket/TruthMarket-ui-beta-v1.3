
// import React from 'react';
import  { useState, useEffect } from 'react';
import { allowance } from '../../../useReadWrite/feeToken/readData';
import { useWalletContext } from '../../../context/useAccount/WalletContext';
import {
    Address_0,
    // Config_feeToken,
    Config_FundManager,
    // Config_Exchange,
    // Config_BoxPublic,
} from '../../../constants/abiAddress_v1_3';

export const useTokenAllowance = (amount:number) => {
    const { address } = useWalletContext()||{}
    const [result, setResult] = useState<boolean>(false);
    const [addr, setAddr] = useState<string>(Address_0);

    useEffect(()=>{
        if (address) {
            setAddr(address);
        } else {
            setAddr(Address_0);
        }
    },[address])

    const allowanceAmount = allowance(addr, Config_FundManager.address);

    useEffect(()=>{
        if (!allowanceAmount || allowanceAmount < amount) {
            setResult(false);
        } else {
            setResult(true);
        }
    },[allowanceAmount])

    return result;

}