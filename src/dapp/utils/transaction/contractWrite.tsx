import { useState} from 'react'
import {
    type BaseError,
    useWriteContract,
    useWaitForTransactionReceipt,// 监控以太坊交易的确认状态
} from 'wagmi'
import { Abi } from 'viem'

// 定义合约写入操作的结果接口
interface ContractWriteResult {
    hash: `0x${string}` | undefined
    isConfirming: boolean
    isConfirmed: boolean
    error: Error | BaseError | null
    write: (args?: unknown[]) => void // 写入函数，参数现在是可选的
    isPending: boolean // 是否处于待处理状态
}

interface ContractArgs{
    address: `0x${string}`,
    abi:Abi,
}

// 自定义 Hook：用于合约写入操作
export function ContractWrite(
    contract: ContractArgs,
    functionName: string
): ContractWriteResult {
    const [hash, setHash] = useState<`0x${string}` | undefined>(undefined)
    const [error, setError] = useState<Error | BaseError | null>(null)

    const address = contract.address;
    const abi = contract.abi;
    // 使用 wagmi 的 useWriteContract hook
    const {
        writeContract,
        error: writeError,
        isPending
    } = useWriteContract()

    // 使用 wagmi 的 useWaitForTransactionReceipt hook 监控交易确认状态
    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        error: waitError
    } = useWaitForTransactionReceipt({
        hash,
    })

    // 定义写入函数
    const write = (args?: unknown[]) => {
        setError(null)
        writeContract(
            {
                address,
                abi,
                functionName,
                args: args || [], // 如果没有提供参数，则使用空数组
            },
            {
                onSuccess(data) {
                    setHash(data)
                },
                onError(err) {
                    setError(err)
                },
            }
        )
    };

    // 合并错误
    const combinedError = error || writeError || waitError

    // 返回结果对象
    return {
        hash,
        isConfirming,
        isConfirmed,
        error: combinedError,
        write,
        isPending
    }
}