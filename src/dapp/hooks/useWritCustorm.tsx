import { 
    useWaitForTransactionReceipt,
    useWriteContract
} from 'wagmi';
// import { type Address, type Abi } from 'viem';
import { ContractConfigType } from '../constants/abiAddress_v1_2';

interface WriteContractConfig {
    contract: ContractConfigType,
    functionName: string;
    args: any[];
}

interface WriteContractResult {
    write: (config: WriteContractConfig) => Promise<`0x${string}`>;
    hash: `0x${string}` | undefined;
    error: Error | null;
    isPending: boolean;
    isConfirmed: boolean;
}

export const useWriteCustorm = (): WriteContractResult => {
    const {
        writeContractAsync,  // 写入合约的异步函数
        data: hash,         // 交易哈希
        error,             // 具体的错误信息
        isPending,         // 交易是否待处理，等待钱包确认
        // isLoading,         // 交易是否加载中，等待钱包打包
        // isError,           // 是否有错误 Boolean值
        // isSuccess,         // 交易是否成功发送
        // isConfirmed,       // 交易是否已确认
        // status,            // 交易状态：'idle' | 'error' | 'loading' | 'success'
        // reset             // 重置状态的函数
    } = useWriteContract();

    const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    const write = async (config: WriteContractConfig) => {
        try {
            const result = await writeContractAsync({
                address: config.contract.address,
                abi: config.contract.abi,
                functionName: config.functionName,
                args: config.args,
            });
            return result;
        } catch (err) {
            console.error('Contract write failed:', err);
            throw err;
        }
    };

    return {
        write,
        hash,
        error,
        isPending,
        isConfirmed,
    };
};

// const { write, hash, error, isPending } = useWriteCustorm();

// const handleAction1 = async () => {
//     await write({
//         contract: Contract1,
//         functionName: 'function1',
//         args: [arg1, arg2]
//     });
// };

// const handleAction2 = async () => {
//     await write({
//         contract: Contract2,
//         functionName: 'function2',
//         args: [arg3, arg4]
//     });
// };