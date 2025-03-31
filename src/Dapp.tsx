// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './dapp/components/Header';
import Marketplace from './dapp/pages/Marketplace';
import Create from './dapp/pages/Create';
import Staking from './dapp/pages/Staking';
import DAO from './dapp/pages/DAO';
import Profile from './dapp/pages/Profile';
import NftDetailPage from './dapp/pages/NftDetail';
import Token from './dapp/pages/Token';
import '@rainbow-me/rainbowkit/styles.css'
import { ThemeProvider } from './theme/ThemeProvider';
import { ContextProvider } from './dapp/context';
import { NftListProvider } from './dapp/dappContext/nftList';
import { EventDataProvider } from './dapp/dappContext/eventDataContext';
// import { NftDetailProvider } from './dapp/pages/NftDetail/useState/nftDetail';
import { NftDetailTwoProvider } from './dapp/dappContext/nftDetailTwo';
import { StatisticsDataProvider } from './dapp/dappContext/statisticsDataContext';

// 创建 QueryClient 实例，并配置缓存选项
// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             staleTime: 1000 * 10, // 数据立即过期，需要重新获取
//             // cacheTime: 1000 * 60, // 缓存数据保留时间（例如：1分钟）
//             refetchOnMount: false, // 组件挂载时重新获取数据
//             refetchOnWindowFocus: false, // 窗口聚焦时重新获取数据
//             refetchInterval: false, // 不自动轮询
//         },
//     },
// });

const Dapp = () => {
    return (
        <ThemeProvider>
            <ContextProvider>
                <StatisticsDataProvider>
                    <NftListProvider>
                        <EventDataProvider>
                            <NftDetailTwoProvider>
                                <div>
                                    <Header />
                                    <div>
                                        <Routes>
                                            <Route path="/" element={<Marketplace />} />
                                            <Route path="/create" element={<Create />} />
                                            <Route path="/staking" element={<Staking />} />
                                            <Route path="/dao" element={<DAO />} />
                                            <Route path="/token" element={<Token />} />
                                            <Route path="/profile" element={<Profile />} />
                                            <Route path="/nftDetail/:tokenId" element={<NftDetailPage />} />
                                        </Routes>
                                    </div>
                                </div>
                            </NftDetailTwoProvider>
                        </EventDataProvider>
                    </NftListProvider>
                </StatisticsDataProvider>
            </ContextProvider>
        </ThemeProvider>
    );
};

export default Dapp;