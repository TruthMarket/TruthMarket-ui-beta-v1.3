import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import Data from '../useState/statisticsData';
import { useStatisticsDate } from "../../../hooks/useStatisticsData";
import { useStatisticsDataContext } from "../../../dappContext/statisticsDataContext";
import { useStepStatusContext } from '../useState/stepStatusContext';

interface Props {
    // current:number, 
    // pageSize:number,
    onStatisticsLoaded: () => void;
}

const DataBar: React.FC<Props> = ({onStatisticsLoaded}) => {
    const { getStatisticsDate } = useStatisticsDate()
    const {
        // statisticsData,
        // timestamp,
        // updateStatisticsData,
        updateAllStatisticsData,
        checkDataExpired,
    } = useStatisticsDataContext();
    const {setStepStatus}=useStepStatusContext()

    useEffect(() => {
        const fetch = async () => {
            setStepStatus('init')
            const isExpired = checkDataExpired()
            console.log('isExpired',isExpired)
            if (isExpired) {
                setStepStatus('statistics_loading')
                const data = await getStatisticsDate();
                updateAllStatisticsData({ 
                    total: data.total,
                    blacks: data.blacks,
                    totalDisplay: data.totalDisplay,
                    storing: data.storing,
                    onSale: data.onSale,
                    swaping: data.swaping,
                    completed: data.completed,
                    published: data.published,
                    GTV: data.GTV,
                });
            }
            // 给状态更新一个缓冲时间
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            setStepStatus('statistics_loaded');
            console.log('statistics_loaded');
            onStatisticsLoaded(); // 通知父组件
        }
        fetch()
    }, [])

    return (
        <div className={styles.dataBar}>
            {
                Data.map((item, index) => {
                    return (
                        <span className={styles.data} key={index}>
                            <p className={styles.labelName}>
                                {item.label}
                            </p>
                            <p className={styles.count} key={index}>
                                {index === Data.length - 1
                                    ? new Intl.NumberFormat('en-US').format(item.count)
                                    : item.count}
                            </p>
                            {index === Data.length - 1 && (
                                <p className={styles.dollars}>
                                    $
                                </p>
                            )}
                        </span>
                    )
                })
            }
        </div>
    );
};

export default DataBar;
