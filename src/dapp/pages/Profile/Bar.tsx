import { useState } from 'react';
import styles from './styles.module.scss';

export const Profile = ()=> {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <>
            <div className={styles.home}>
                <div className={styles.container}>
                    <div className={styles.tabBar}>
                        <ul>
                            {['Profile', 'Settings', 'Security', 'Help', 'Published'].map((item, index) => (
                                <li
                                    key={index}
                                    className={activeIndex === index ? styles.active : ''}
                                    // {`${styles.link} ${nowLink === 'staking' ? styles.now : ''}`}
                                    onClick={() => handleClick(index)}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>

                    </div>

                    
                </div>

            </div>
        </>


    );
}