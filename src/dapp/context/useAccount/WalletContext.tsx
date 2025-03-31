import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import { BrowserProvider, JsonRpcSigner } from 'ethers';

// 定义用户角色类型
type Role = 'admin' | 'other' | null;

// 更新 WalletContext 的类型
interface WalletContextType {
    address: string | undefined;
    isConnected: boolean;
    // chainId: number | undefined;
    publicClient: any;
    walletClient: any;
    signer: JsonRpcSigner | null;
    accountRole: Role;
}

// 创建 WalletContext，初始值为 null
const WalletContext = createContext<WalletContextType>({
    address: undefined,
    isConnected: false,
    // chainId: undefined,
    publicClient: null,
    walletClient: null,
    signer: null,
    accountRole: null,
});

// 创建一个自定义 hook 以便在其他组件中使用 WalletContext
export const useWalletContext = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { address, isConnected } = useAccount();
    // const { chain } = http();
    const { data: walletClient } = useWalletClient();
    const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
    const [accountRole, setAccountRole] = useState<Role>(null);
    const publicClient = usePublicClient();

    useEffect(() => {
        const updateSigner = async () => {
            if (walletClient) {
                const provider = new BrowserProvider(walletClient as any);
                const newSigner = await provider.getSigner();
                setSigner(newSigner);
            } else {
                setSigner(null);
            }
        };

        updateSigner();
    }, [walletClient]);

    useEffect(() => {
        if (address && isConnected) {
            console.log('current account:', address)
            const isAdmin = (address === '0x50012f867970ec68f52991D5474679894383dE0A');
            setAccountRole(isAdmin ? 'admin' : 'other');
        } else {
            setAccountRole(null);
        }
    }, [address, isConnected]);

    return (
        <WalletContext.Provider
            value={{
                address,
                isConnected,
                // chainId: chain?.id, 
                publicClient, 
                walletClient,
                signer,
                accountRole
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};
