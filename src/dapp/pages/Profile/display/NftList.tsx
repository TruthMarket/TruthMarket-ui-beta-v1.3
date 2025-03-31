import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NftDetailType, BoxStatus } from '../../../type/contractDate';
import CardProfile from '../CardProfile';
import SkeletonProfile from '../SkeletonProfile';
import { useGetNftList } from '../hooks/useGetNftList';
import { useTabContext } from '../context/tabContext';
// import { useAccount } from 'wagmi';
import { useDisplayContext } from '../context/displayContext';
import styles from '../styles.module.scss';

interface NftListProps {
    // currentPage: number;
    // pageSize: number;
    // currentTab:string;
    isLoaded: () => void;
}

// NFT列表展示组件
export const NftList: React.FC<NftListProps> = ({
    // currentPage,
    // pageSize,
    // currentTab,
    isLoaded
}) => {
    const navigate = useNavigate();
    // 处理NFT卡片点击事件
    const handleNftDetailClick = (tokenId: number, status: BoxStatus) => {
        navigate(`/app/nftDetail/${tokenId}`, { state: { status } });
    };

    const {
        // setStepStatus,
        currentPage,
        pageSize,
        // eventLoaded,
        loadingMessage,
        stepStatus,
        setLoadingMessage,
        // setIsListLoaded
    } = useDisplayContext() || {};

    const { currentTab } = useTabContext() || {};
    const [loading, setLoading] = useState<boolean>(true)
    const [nftList, setNftList] = useState<NftDetailType[]>([]);
    const {getNftList} = useGetNftList();
    // const { address } = useAccount();

    useEffect(() => {
        const fetch = async () => {
            // 先判断事件数据是否加载完成。
            setLoading(true)
            if (stepStatus !== 'tabList_confirmed' || !currentPage || !pageSize) return;
            try {
                setNftList([])
                // console.log('nftList be empty!');
                const nftList = await getNftList(currentPage, pageSize, currentTab || 'Minter')
                if (!nftList) {
                    // console.error('nftList error!');
                    setLoadingMessage?.( 'No data');
                    return;
                } else {
                    setNftList(nftList)
                    // console.log('nftList:', nftList);
                }

                isLoaded(); // 通知父组件统计数据已加载
                // setIsListLoaded?.(true)
                // setStepStatus?.('complete')
            } catch (error) {
                console.error('MarketList get error:', error);
            } finally {
                // setEventLoaded?.(false);
                // 缓冲时间
                await new Promise(resolve => setTimeout(resolve, 300));
                setLoading(false)
            }

        }
        fetch()
    }, [currentPage, pageSize, currentTab, stepStatus])

    if (!pageSize) return <div></div>

    // 加载状态显示骨架屏
    return (
        <>
            {loading ? (
                Array.from({ length: pageSize }).map((_, index) => (
                    <SkeletonProfile key={index} />
                ))
            ) : (
                <>
                    {nftList.map((item) => (
                        <CardProfile
                            key={item.tokenId}
                            data={item}
                            onClick={() => handleNftDetailClick(item.tokenId, item.status)}
                        />
                    ))}
                    {loadingMessage && <p className={styles.message}>{loadingMessage}</p>}
                </>
            )}
        </>
    );
}
