import React, {
    useState,
    useEffect
} from 'react';
// import { TabCountsType, useEventContext } from '../context/eventListContext';
import { 
    TabCountsType, 
    useEventDataContext 
} from '../../../dappContext/eventDataContext';
// import { useGetTabCounts } from '../hooks/useGetTabCounts';
import { useAccount } from 'wagmi';
// import { useTotalItems } from '../hooks/useTotalItems';
import styles from '../styles.module.scss';
import { useGetEventLogs } from '../hooks/useGetEventLogs';
import { useTabContext } from '../context/tabContext';
import { useDisplayContext } from '../context/displayContext';
import { useWithdrawContext } from '../context/withdrawContext';
// import { useIsUpdateEventLogs } from '../hooks/useIsUpdateEventLogs';

const tabList_init = [
    { name: 'minter', number: 0 },
    // { name: 'seller', number: counts?.seller },
    { name: 'buyer', number: 0 },
    { name: 'bidder', number: 0 },
    { name: 'completer', number: 0 },
    { name: 'total_Rewards', number: 0 },
    { name: 'unclaimed', number: 0 },
]

const DataBar: React.FC = () => {
    const { address } = useAccount();
    const { 
        getTabCounts,
        checkAddressExpired,
    } = useEventDataContext();
    const [tabCounts,setTabCounts] = useState<TabCountsType|null>(null)
    const { setWithdrawList, setWithdrawType } = useWithdrawContext() || {};
    const { currentTab, setCurrentTab, } = useTabContext() || {}
    const getEventLogs = useGetEventLogs();
    // const { isUpdateEventLogs } = useIsUpdateEventLogs();
    const { 
        stepStatus,
        setStepStatus,
        initialPageData,
        setTotalCounts, 
        // setEventLoaded 
    } = useDisplayContext() || {}
    const [tabList, setTabList] = useState(tabList_init)

    useEffect(() => {
        // step1，当地址改变时判断是否要读取事件日志
        const fetch = async () => {
            // setEventLoaded?.(false); // 正在更新
            initialPageData?.(); // 初始化页面数据
            setTabList(tabList_init);
            setStepStatus?.('loading_events');
            try {
                if (!address) return;
                const isExpired = checkAddressExpired(address);
                if (!isExpired) return;
                await getEventLogs(address);
            } catch (error) {
                console.error('get event logs error!')
            } finally {
                // setEventLoaded?.(true); // 更新完成
                setStepStatus?.('events_loaded');
            }
        }
        fetch();
    }, [address])

    useEffect(() => {
        // step2，读取事件日志完成后，获取tab的数据
        if (stepStatus ==='events_loaded' && address) {
            
            const tabData = getTabCounts(address)
            if(tabData) {
                setTabCounts(tabData)
            }
            setStepStatus?.('tabCounts_loaded');
        }
    },[stepStatus])

    useEffect(() => {
        // step3，加载tab的数据至状态变量
        if (stepStatus ==='tabCounts_loaded' && tabCounts) {
            const updatedList = tabList.map(item => ({
                ...item,
                number: tabCounts[item.name.toLowerCase() as keyof TabCountsType] || 0
            }));
            setTabList(updatedList);

            // 找到第一个数量大于0的项目设置为当前tab
            const firstNonZeroItem = updatedList.find(item => item.number > 0);
            if (firstNonZeroItem) {
                setTotalCounts?.(firstNonZeroItem.number);
                setCurrentTab?.(firstNonZeroItem.name);
            }
            setStepStatus?.('tabList_confirmed');
        }
    }, [stepStatus]);

    const handleClick = (name: string) => {
        if (currentTab !== name && name !== 'Total_income' && name !== 'Unclaimed') {
            setCurrentTab?.(name);
            // 初始化一些数据
            initialPageData?.();
            // 使用类型断言访问动态键
            const totals = tabCounts?.[name.toLowerCase() as keyof TabCountsType] || 8;
            setTotalCounts?.(totals);
            setWithdrawList?.([])
            setWithdrawType?.('')
        }
        console.log('currentTab clicked :', name)
    };

    return (

        <>
            {tabList.map((item, index) => (
                <div
                    key={index}
                    className={`${styles.data} ${currentTab === item.name ? styles.active : ''}`}
                    onClick={() => handleClick(item.name)}
                >
                    <p className={styles.dataItem}>{item.name}</p>
                    <p className={styles.dataNumber}>{item.number}</p>
                </div>
            ))}
        </>

    );
};
export default DataBar;