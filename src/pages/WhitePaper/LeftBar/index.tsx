import React, { useEffect, useState, useRef } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import tab from '../data';

interface LeftBarProps {
    selectedTab: number;
    setSelectedTab: (id: number) => void;
    isShow: boolean;
    isLeft: boolean;
    isLeftIcon: boolean;
    handleIconClick: () => void;
}

const LeftBar: React.FC<LeftBarProps> = ({
    selectedTab,
    setSelectedTab,
    isShow,
    isLeft,
    isLeftIcon,
    handleIconClick
}) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const leftContentRef = useRef<HTMLDivElement>(null);

    // 处理滚动事件
    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            setScrollPosition(position);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 计算侧边栏的位置
    const getTopPosition = () => {
        if (!leftContentRef.current) return 80;

        const headerHeight = 80; 
        const minTop = headerHeight;
        const contentHeight = leftContentRef.current.scrollHeight;
        const viewportHeight = window.innerHeight;
        const maxScroll = document.documentElement.scrollHeight - viewportHeight;
        const currentScroll = Math.min(scrollPosition, maxScroll);

        // 如果内容高度小于视口高度，保持在顶部固定位置
        if (contentHeight <= viewportHeight - headerHeight) {
            return headerHeight;
        }

        // 计算底部位置
        const bottomPosition = viewportHeight - contentHeight;
        const newTopPosition = minTop - currentScroll;

        // 确保不会超出顶部和底部的限制
        return Math.min(minTop, Math.max(bottomPosition, newTopPosition));
    };

    return (
        <div 
            className={styles.left}
            style={{ 
                top: isShow ? `${getTopPosition()}px` : '80px'
            }}
        >
            {isLeft && (
                <div 
                    ref={leftContentRef}
                    className={`${styles.leftContent} ${isLeft ? styles.visible : ''}`}
                >
                    <div className={styles.tabs}>
                        {tab.map((item) => (
                            <div
                                key={item.id}
                                className={`${styles.tab} 
                                    ${selectedTab === item.id ? styles.active : ''} 
                                    ${item.id === tab.length ? styles.lastTab : ''}`}
                                onClick={() => setSelectedTab(item.id)}
                            >
                                {item.title}
                            </div>
                        ))}
                    </div>
                    {!isShow && (<div className={styles.verticalLine}></div>)}
                </div>
            )}
            {isShow && (
                <span 
                    className={styles.outlined} 
                    onClick={handleIconClick}
                >
                    {isLeftIcon ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
                </span>
            )}
        </div>
    );
};

export default LeftBar;
