//// @ts-nocheck
import React, {
    useState,
    useEffect,
    // useCallback, 
    // useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles.module.scss';
import NftCard from '../../../components/NftCard';
import SkeletonApp from '../../../components/Skeleton';
// import { ContractContext } from '../../../context';
import { NftDetailType, BoxStatus } from '../../../type/contractDate';
// import { 
    // useState_StatisticsDate, 
//     currentStatistics 
// } from '../useState/statisticsData';
// import { useStatisticsDate } from '../../../hooks/useStatisticsData';
import { useStepStatusContext } from '../useState/stepStatusContext';
import { useStatisticsDataContext } from '../../../dappContext/statisticsDataContext';
import { useGetStartEnd } from '../hooks/useGetStartEnd';
import { useGetNftDetail } from '../../../hooks/useGetNftDetail';

interface Props {
    current:number, 
    pageSize:number,
    // onStatisticsLoaded: () => void;
}

export const Display:React.FC<Props> = ({current, pageSize}) => {
    const {getNftDetail} = useGetNftDetail();
    const navigate = useNavigate();
    const { stepStatus,setLoadingMessage} = useStepStatusContext();
    const {statisticsData,} = useStatisticsDataContext();
    const [marketList, setMarketList] = useState<NftDetailType[]>([]);
    // const { updateStatisticsDate } = useState_StatisticsDate();
    const {getStartEnd}= useGetStartEnd();
    const [loading, setLoading] = useState<boolean>(true);

    const handleNftDetailClick = (tokenId: number, status: BoxStatus) => {
        navigate(`/app/nftDetail/${tokenId}`, { state: { status } });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (stepStatus != 'statistics_loaded') {
                return;
            }
            setLoading(true);
            try {
                const { start, end } = await getStartEnd(current, pageSize, statisticsData.total);
                setMarketList([]); // clear current list
                setLoadingMessage('NFT data loading...');
                const counts = end - start + 1; // 当前页面的数量
                let tokenId = start;
                let error = 0, success = 0, flag = true;

                while (flag) {
                    // console.log("current tokenId:", tokenId);
                    const nftDetail= await getNftDetail(tokenId);
                    if (nftDetail) {
                        setMarketList(prevList => [...prevList, nftDetail]);
                        success++;
                    } else {
                        error++;
                    }
                    tokenId++;
                    setLoadingMessage(`Loaded ${success}, ${error} failed !  ${counts}totals `);
                    // 超出页面数量或者超过总量，就停止。
                    if (tokenId > statisticsData.total || success >= counts) {
                        flag = false;
                    }
                }
            } catch (error) {
                console.error('Marketplace loading error:', error);
                setLoadingMessage('loading error! Please refresh the page and try again');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [current, pageSize, stepStatus]); // 添加 current 和 pageSize 作为依赖项

    return (
        <div className={styles.display}>
            {loading ? (
                Array.from({ length: pageSize }).map((_, index) => (
                    <SkeletonApp key={index} />
                ))
            ) : (
                <>
                    {marketList.map((item) => (
                        <NftCard
                            key={item.tokenId}
                            data={item}
                            onClick={() => handleNftDetailClick(item.tokenId, item.status)}
                        />
                    ))}
                    
                </>
            )}
        </div>
    );
}


