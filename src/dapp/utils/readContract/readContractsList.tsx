// import { useState, useEffect } from 'react';
import { useReadContracts } from 'wagmi';
import { Abi } from 'viem';

interface ContractConfig {
    address: `0x${string}`;
    abi: Abi;
    chainId: number;
}

interface UseBatchReadContractsResult {
    data: any;
    isLoading: boolean;
    isError: boolean;
    error: string;
}

// 
export function useReadContractsList (
    argsList: any[],
    contractConfig: ContractConfig,
    functionName: string,
): UseBatchReadContractsResult {

    const count = argsList.length;
    const calls = Array.from({ length: count}, (_, i) => ({
        ...contractConfig,
        functionName: functionName,
        args: [argsList[i]],
    }));
    // console.log('ReadContractsList,calls：', calls)
    const { data, error: errorM, isError, isLoading} = useReadContracts({
        contracts:calls,
    });
    
    const error = errorM?.message;
    // console.log('ReadContractsList,data：', data)
    // console.log('ReadContractsList,error：', error)

    return { data, isLoading, isError, error: error || '' };
};
