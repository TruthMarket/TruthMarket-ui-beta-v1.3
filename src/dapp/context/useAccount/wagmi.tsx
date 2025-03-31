import { 
    // configureChains, 
    http , 
    createConfig } from 'wagmi'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
    rainbowWallet,
    coinbaseWallet,
    ledgerWallet,
    argentWallet,
    omniWallet,
    imTokenWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { 
    // mainnet, 
    sepolia 
} from 'wagmi/chains'

// import { publicProvider } from 'wagmi/providers/public'

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//     [sepolia],
//     [
//         publicProvider({
//             timeout: 60000, // 设置为60秒
//         }),
//     ],
// )

const connectors = connectorsForWallets(
    [
        {
            groupName: 'Recommended',
            wallets: [rainbowWallet,coinbaseWallet,],
        },
        {
            groupName: 'more',
            wallets: [argentWallet,omniWallet,imTokenWallet,ledgerWallet],
        },
    ],
    {
        appName: 'RainbowKit demo',
        projectId: 'YOUR_PROJECT_ID',
    }
);

export const config = createConfig ({
    // autoConnect: true,
    // publicClient,
    // webSocketPublicClient,
    ////
    connectors,
    chains: [
        // mainnet,
        {
            ...sepolia,
            iconBackground: '#657513',
            iconUrl: 'https://example.com/icons/sepolia.png',
        }
    ],
    transports: {
        // [mainnet.id]: http(),
        [sepolia.id]: http(
                'https://sepolia.infura.io/v3/0830005962704cd7841ca5ee1a424d94' // 如果你有 Infura API key
        ),
    },
})
/* New API that includes Wagmi's createConfig and replaces getDefaultWallets and connectorsForWallets */
// const configDefault = getDefaultConfig({
//     appName: 'RainbowKit demo',
//     projectId: 'YOUR_PROJECT_ID',
//     chains: [
//         mainnet,
//         {
//             ...sepolia,
//             iconBackground: '#657513',
//             iconUrl: 'https://example.com/icons/sepolia.png',
//         }
//     ],
//     transports: {
//         [mainnet.id]: http(),
//         [sepolia.id]: http(),
//     },
// })