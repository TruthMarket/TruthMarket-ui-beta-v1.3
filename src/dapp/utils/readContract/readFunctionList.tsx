import {
    useState,
    useEffect,
    // useMemo, 
    // useRef
} from 'react';
import { useReadContracts } from 'wagmi';
import { Abi } from 'viem';

interface ContractConfig {
    address: `0x${string}`;
    abi: Abi;
    chainId: number;
}

export interface UseReadFunctionListResult<T> {
    state: T;
    isLoading: boolean;
    isError: boolean;
}
// const functionList = ['mint', 'approve', 'balanceOf']

export const useReadFunctionList = <T extends Record<string, any>>(
    functionList: string[],
    contractConfig: ContractConfig,
): UseReadFunctionListResult<T> => {

    const [state, setState] = useState<T>({} as T);

    const calls = Array.from({ length: functionList.length }, (_, i) => ({
        ...contractConfig,
        functionName: functionList[i],
        // args: [i + 1],
    }));

    const { data, isLoading, isError} = useReadContracts({
        contracts: calls,
    });

    useEffect(() => {
        if (data) {
            const newState = functionList.reduce((acc, functionName, index) => {
                return { ...acc, [functionName]: data[index].result };
            }, {} as T);
            setState(newState as T);
        }
    }, [data, functionList]);

    return { state, isLoading, isError };

}