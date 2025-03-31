// DisplayCard.tsx
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

interface Props {
    id: number;
    data: {
        img: string;
        title: string;
        content: string;
        content02: string;
    }
}

const DisplayCard: React.FC<Props> = ({ id, data }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1
            }
        );

        const element = document.getElementById(`card-${id}`);
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [id]);

    return (
        <div id={`card-${id}`} className={`${styles.displayCard} ${isVisible ? styles.visible : ''}`}>
            {id % 2 === 0 ? (
                <div className={styles.imgLeft}>
                    <img src={data.img} alt="image" />
                    <span className={styles.spanLeft}>
                        <h1>{data.title}</h1>
                        <p>{data.content}</p>
                        <p>{data.content02}</p>
                    </span>
                </div>
            ) : (
                <div className={styles.imgRight}>
                    <span className={styles.spanRight}>
                        <h1>{data.title}</h1>
                        <p>{data.content}</p>
                        <p>{data.content02}</p>
                    </span>
                    <img src={data.img} alt="image" />
                </div>
            )}
        </div>
    );
};

export default DisplayCard;