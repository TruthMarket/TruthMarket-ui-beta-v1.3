import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

interface Props {
    status: string;
}

// 定义状态流程顺序
const statusFlow = [
    { key: 'Storing', label: 'Storing', colorClass: 'storing' },
    { key: 'Selling', label: 'Selling', colorClass: 'selling' },
    { key: 'Auctioning', label: 'Auctioning', colorClass: 'selling' }, // 使用相同的selling样式
    { key: 'Refunding', label: 'Refunding', colorClass: 'refunding' },
    { key: 'Delivering', label: 'Delivering', colorClass: 'delivering' },
    { key: 'Completed', label: 'Completed', colorClass: 'completed' },
    { key: 'Published', label: 'Published', colorClass: 'published' }
];

const StatusStep: React.FC<Props> = ({ status }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const activeNodeRef = useRef<HTMLDivElement>(null);
    
    const currentIndex = statusFlow.findIndex(item => item.key === status);
    const currentStatus = statusFlow[currentIndex];

    // 获取连接线的样式类名
    const getLineClassName = (index: number) => {
        const nextIndex = index + 1; // 获取右侧节点的索引
        
        if (nextIndex < currentIndex) {
            // 如果右侧节点已完成，显示绿色
            return styles.line_completed2;
        } else if (nextIndex === currentIndex) {
            // 如果右侧节点是当前激活节点，使用其主题色
            return styles[`line_${statusFlow[nextIndex].colorClass}`];
        } else {
            // 如果右侧节点未完成，显示灰色
            return styles.pending;
        }
    };

    // 处理滚动居中
    useEffect(() => {
        if (containerRef.current && activeNodeRef.current) {
            const container = containerRef.current;
            const activeNode = activeNodeRef.current;

            // 获取容器和节点的尺寸信息
            const containerRect = container.getBoundingClientRect();
            const activeNodeRect = activeNode.getBoundingClientRect();

            // 计算容器和节点的中心点
            const containerCenter = containerRect.width / 2;
            const activeNodeCenter = activeNodeRect.left - containerRect.left + (activeNodeRect.width / 2);

            // 计算需要滚动的距离，使节点中心与容器中心对齐
            const scrollPosition = container.scrollLeft + (activeNodeCenter - containerCenter);

            // 使用平滑滚动
            container.scrollTo({
                left: Math.max(0, scrollPosition), // 防止出现负值滚动
                behavior: 'smooth'
            });
        }
    }, [status,currentStatus]);

    return (
        <div className={styles.stepWrapper}>
            <div ref={containerRef} className={styles.stepContainer}>
                {statusFlow.map((step, index) => (
                    <React.Fragment key={step.key}>
                        <div className={styles.stepItem}>
                            <div 
                                ref={index === currentIndex ? activeNodeRef : null}
                                className={`${styles.stepNode} ${
                                    index === currentIndex ? styles[`active_${step.colorClass}`] :
                                    index < currentIndex ? styles[`completed_${step.colorClass}`] :
                                    styles.pending
                                }`}
                            >
                                {step.label}
                            </div>
                            {index < statusFlow.length - 1 && (
                                <div 

                                className={`${styles.stepLine} ${getLineClassName(index)}`}

                            />
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default StatusStep;