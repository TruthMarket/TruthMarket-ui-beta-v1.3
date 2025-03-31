//// @ts-nocheck
import {
    useEffect,
    useState,
    // useEffect,
    // useCallback, 
    // useContext
} from 'react';
import styles from './styles.module.scss';
import DataBar from './dataBar';
import ConditionalBar from './conditionalBar';
import PageSelector from '../../components/PageSelector';
import Message from './message';
import { useStatisticsDataContext } from '../../dappContext/statisticsDataContext';
// import { useTestFundManagerProvider } from '../../context/providerTest/useProviderFundManger';
// import { useTestPublicKeyProvider } from '../../context/providerTest/useProviderPublicKey';
import { Display } from './display';
import { StepStatusProvider } from './useState/stepStatusContext';
import PromptModal from './modalDialog/prompt';
// import { usePublicKey_office } from '../../useReadWrite/publicKeyCrypt/usePublicKeyOffice';

const Marketplace = () => {
    const {statisticsData,} = useStatisticsDataContext();
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    // const {statisticsDate} = useState_StatisticsDate();
    const [isStatisticsLoaded, setIsStatisticsLoaded] = useState(false);
    const [totalDisplay,setTotalDisplay] = useState<number>(0)
    const [isPromptOpen, setIsPromptOpen] = useState(false);

    useEffect(()=>{
        setTotalDisplay(statisticsData.totalDisplay);
    },[statisticsData.totalDisplay])

    // 添加一个函数来更新统计数据加载状态
    const handleStatisticsLoaded = () => {
        setIsStatisticsLoaded(true);
    };

    const handlePageChange = (page: number, size: number) => {
        // 同步更新两个状态
        Promise.all([
            setCurrent(page),
            setPageSize(size)
        ]);

        // 或者使用 useEffect 监听变化
        console.log("Page changed to:", page, 'size:', size);
    };

    // 在组件加载时自动显示提示模态框
    useEffect(() => {
        setIsPromptOpen(true);
    }, []);

    return (
            <StepStatusProvider>
                <div className={styles.home}>
                    <div className={styles.first}>
                        <p>
                            The truth will eventually be revealed, <br />
                            and the criminals will eventually be judged!
                        </p>
                    </div>
                    <DataBar onStatisticsLoaded={handleStatisticsLoaded}/>

                    <div className={styles.second}>
                        <div className={styles.container}>
                            <ConditionalBar />

                            <Display
                                key={`${current}-${pageSize}`}
                                current={current}
                                pageSize={pageSize}
                                // onStatisticsLoaded={handleStatisticsLoaded}
                            />
                            <Message/>
                            <div className={styles.pageSelector}>
                                {isStatisticsLoaded && (
                                    <PageSelector
                                        key={totalDisplay}
                                        currentPage={current}
                                        pageSize={pageSize}
                                        total={totalDisplay}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 提示模态弹窗 */}
                <PromptModal 
                    isOpen={isPromptOpen} 
                    onClose={() => setIsPromptOpen(false)} 
                />
            </StepStatusProvider>
    );
}

export default Marketplace;
