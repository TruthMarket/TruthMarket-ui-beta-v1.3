//@ts-nocheck
import React, {
    ReactNode,
    // useEffect, 
    // useState ,
} from "react";
import {
    // RainbowKitProvider,
    // getDefaultWallets,
    // midnightTheme,
    useAddRecentTransaction,
    // useConnectModal,
} from "@rainbow-me/rainbowkit";
import {
    // State,
    // WagmiProvider,
    useAccount,
    usePublicClient,
    useWalletClient,
} from "wagmi";
import {
    Proxy_TruthBox,
    ABI_TruthBox,
    Proxy_Exchange,
    ABI_Exchange,
    Proxy_FundManager,
    ABI_FundManager,
    Proxy_EncryptionStorage,
    ABI_EncryptionStorage,
} from "../constants/abiAddress_v1_3";
import { useProviderEncryption } from "./providerEncryption";
import { ContractContext } from "./index";
import {
    formatEther,
    createPublicClient,
    http,
    getContract,
    // recoverMessageAddress 
} from "viem";
// import axios from "axios";
import { sepolia } from 'viem/chains'
import { useProviderFundManager } from "./providerFundManager";
import { useProviderExchange } from "./providerExchange";
import { useProviderTruthBox } from "./providerTruthBox";

export interface ContractFunctionParams {
    functionName: string; 
    methodType: string; 
    args?: any; 
    values?: bigint; 
}


export function ContractProvider({ children }: { children: ReactNode }) {
    const publicClient = usePublicClient(); // 公共客户端hook
    const { data: walletClient } = useWalletClient(); // 钱包客户端hook
    const { address: currentAddress } = useAccount(); 
    const addRecentTransaction = useAddRecentTransaction(); 

    const client_viem = createPublicClient({
        batch: {
            multicall: true,
        },
        chain: sepolia,
        transport: http(
            // 添加多个备用 RPC
            import.meta.env.VITE_INFURA_API_URL
            ,
            {
                retryCount: 3,
                timeout: 15000
            }
        )
    })

    const contract_viem = getContract({ address: Proxy_TruthBox, abi: ABI_TruthBox, client: client_viem })

    const contractFunction = async ({
        functionName,
        methodType,
        args = [],
        values = BigInt(0), // 指定在调用智能合约函数时发送的以太币（或其他原生代币）数量
    }: ContractFunctionParams) => {
        let contract;
        if (methodType === "read_truthBox") {
            contract = await publicClient?.readContract({
                address: Proxy_TruthBox,
                abi: ABI_TruthBox,
                functionName: functionName,
                account: currentAddress,
                args: args,
            });
        } else if (methodType === "read_exchange") {
            contract = await publicClient?.readContract({
                address: Proxy_Exchange,
                abi: ABI_Exchange,
                functionName: functionName,
                account: currentAddress,
                args: args,
            });
        } else if (methodType === "read_fundManager") {
            contract = await publicClient?.readContract({
                address: Proxy_FundManager,
                abi: ABI_FundManager,
                functionName: functionName,
                account: currentAddress,
                args: args,
            });
        } else if (methodType === "read_encryption") {
            contract = await publicClient?.readContract({
                address: Proxy_EncryptionStorage,
                abi: ABI_EncryptionStorage,
                functionName: functionName,
                account: currentAddress,
                args: args,
            });
        } else if (methodType === "write_truthBox") {
            contract = await walletClient?.writeContract({
                abi: ABI_TruthBox,
                address: Proxy_TruthBox,
                functionName: functionName,
                args: args,
                account: currentAddress,
                value: values,
            });

            addRecentTransaction({
                hash: contract!.toString(),
                description: `write ${functionName} to contract`,
            });
        } else if (methodType === "write_exchange") {
            contract = await walletClient?.writeContract({
                abi: ABI_Exchange,
                address: Proxy_Exchange,
                functionName: functionName,
                args: args,
                account: currentAddress,
                value: values,
            });

            addRecentTransaction({
                hash: contract!.toString(),
                description: `write ${functionName} to contract`,
            });
        } else if (methodType === "write_fundManager") {
            contract = await walletClient?.writeContract({
                abi: ABI_FundManager,
                address: Proxy_FundManager,
                functionName: functionName,
                args: args,
                account: currentAddress,
                value: values,
            });

            addRecentTransaction({
                hash: contract!.toString(),
                description: `write ${functionName} to contract`,
            });
        }
        return contract; 
    };

    // const getBoxInfoList = async (tokenIdArray: number[]) => {
    //     try {
    //         const tx = await Promise.all(
    //             tokenIdArray.map((tokenId) => contract_viem.read_truthBox.getBoxInfo([tokenId]))
    //         );
    //         console.log("getBoxInfoList:", tx);
    //         const boxInfoList = tx.map((data,index) =>boxInfoHanding(data,tokenIdArray[index]))
    //         console.log("getBoxInfoList after:", boxInfoList);
    //         return boxInfoList;
    //     } catch (error) {
    //         console.error("getBoxInfoList error:", error);
    //     }
    // }

    const readEncryption = useProviderEncryption(contractFunction);

    const readFundManager = useProviderFundManager(contractFunction);

    const readExchange = useProviderExchange(contractFunction);

    const readTruthBox = useProviderTruthBox(contractFunction);

    return (
        <ContractContext.Provider
            value={{
                contract: contractFunction,
                // currentAddress: currentAddress!,
                ...readEncryption,
                ...readFundManager,
                ...readExchange,
                ...readTruthBox
            }}
        >
            {children}
        </ContractContext.Provider>
    );
}