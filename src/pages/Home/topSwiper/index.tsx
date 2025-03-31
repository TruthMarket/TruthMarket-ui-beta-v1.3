import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

interface SwiperItem {
    image: string;
    title: string;
    description: string;
}

interface TopSwiperProps {
    items: SwiperItem[];
    interval?: number;
}

const TopSwiper: React.FC<TopSwiperProps> = ({ 
    items, 
    interval = 5000 
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isTextTransitioning, setIsTextTransitioning] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            // 先触发文本淡出
            setIsTextTransitioning(true);
            
            // 准备下一张图片
            const next = (currentIndex + 1) % items.length;
            setNextIndex(next);
            
            // 开始过渡动画
            setTimeout(() => {
                setIsTransitioning(true);
                
                // 完成过渡后更新当前索引
                setTimeout(() => {
                    setCurrentIndex(next);
                    setIsTransitioning(false);
                    setIsTextTransitioning(false);
                }, 500);
            }, 300);
        }, interval);

        return () => clearInterval(timer);
    }, [currentIndex, items.length, interval]);

    const handleIndicatorClick = (index: number) => {
        if (index === currentIndex) return;
        setIsTextTransitioning(true);
        setNextIndex(index);
        
        setTimeout(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
                setIsTextTransitioning(false);
            }, 500);
        }, 300);
    };

    return (
        <div className={styles.swiperContainer}>
            <div className={styles.swiperWrapper}>
                {/* 图片容器 */}
                <div className={styles.imageContainer}>
                    <div 
                        className={`${styles.swiperSlide} ${styles.current} ${
                            isTransitioning ? styles.fadeOut : ''
                        }`}
                        style={{ backgroundImage: `url(${items[currentIndex].image})` }}
                    />
                    <div 
                        className={`${styles.swiperSlide} ${styles.next} ${
                            isTransitioning ? styles.fadeIn : ''
                        }`}
                        style={{ backgroundImage: `url(${items[nextIndex].image})` }}
                    />
                </div>

                {/* 文本内容 */}
                <div className={styles.textContainer}>
                    <div className={`${styles.textContent} ${isTextTransitioning ? styles.fadeOut : styles.fadeIn}`}>
                        <h2 className={styles.title}>{items[currentIndex].title}</h2>
                        <p className={styles.description}>{items[currentIndex].description}</p>
                    </div>
                </div>

                {/* 指示器 */}
                <div className={styles.indicators}>
                    {items.map((_, index) => (
                        <div
                            key={index}
                            className={`${styles.indicator} ${
                                index === currentIndex ? styles.active : ''
                            }`}
                            onClick={() => handleIndicatorClick(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopSwiper;