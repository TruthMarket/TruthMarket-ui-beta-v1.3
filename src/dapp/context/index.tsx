//@ts-nocheck
import React, {
    ReactNode,
    // useEffect, 
    // useState 
} from "react";
import {
    RainbowKitProvider,
    // midnightTheme,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    State,
    WagmiProvider,
} from "wagmi";
import { config } from "./useAccount/wagmi"
import { theme } from "./useAccount/theme";
import { ContractProvider } from "./provider";
import { ContractFunctionParams } from "./provider";
import { WalletProvider } from "./useAccount/WalletContext";
// 初始化React Query客户端
const queryClient = new QueryClient();

// ContextProvider组件，用于包装整个应用程序并提供必要的providers
export function ContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    modalSize="compact" // 模态框大小
                    locale="en-US" // 本地化设置
                    theme={theme}
                    showRecentTransactions={true} // 在UI中显示最近的交易
                >
                    <WalletProvider>
                        <ContractProvider>
                            <div >{children}</div>
                        </ContractProvider>
                    </WalletProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export const ContractContext = React.createContext(
    {} as {
        contract: (params: ContractFunctionParams) => Promise<any>; // 与合约交互的函数
        // currentAddress: `0x${string}`; // 当前地址
        // ------------Truth Box
        name,
        symbol,
        logoURI,
        // 合约地址
        // Admin,
        // Implementation,
        // NFT信息
        getBoxInfo,
        getStatus,
        getDeadline,
        getPrice,
        // 所有权相关
        ownerOf,
        minterOf,
        balanceOf,
        // 统计相关
        totalSupply,
        blackSupply,
        // 状态查询
        isBlackTokenId,
        supportsInterface,
        // ---------------- Exchange
        // 基本信息
        // Admin,
        // Implementation,
        // 角色查询
        buyerOf,
        completerOf,
        // 时间周期
        deliveryPeriod,
        refundRequestPeriod,
        refundReviewPeriod,
        // 时间戳
        deliveryTimestamp,
        purchaseTimestamp,
        refundRequestTimestamp,
        // 状态查询
        inRefundDeadline,
        inReviewDeadline,
        // 支付相关
        calcPayMoney,
        // -----------------FundManager
        // 基本信息
        // Admin,
        // Implementation,
        // 费率查询
        adminFeeRate,
        buyerFeeRate,
        bidIncrementRate,
        completerRewardRate,
        publicRewardRate,
        serviceFeeRate,
        // 金额查询
        orderAmount,
        otherRewards,
        minterRewards,
        publicRewards,
        // 资金池查询
        allocatedFunds,
        unallocatedFunds,
        totalRewards,
        // 状态查询
        refundPermit,
        isPauseWithdraw,
        // ----------------Encryption
        // 基本信息
        // Admin,
        // Implementation,
        // 密钥查询
        PublicKey_minter,
        PublicKey_office,
        PublicKey_buyer,
        PrivateKey_buyer,
        // 加密数据查询
        getCryptData_office,
        getCryptData_buyer,
        // 计数器查询
        officeKeyCounts,
    }
);
