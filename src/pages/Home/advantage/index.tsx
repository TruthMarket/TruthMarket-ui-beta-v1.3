import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import icon1 from '@assets/icon/1.svg';
import icon2 from '@assets/icon/2.svg';
import icon3 from '@assets/icon/3.svg';

function Advantage() {
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

        const element = document.getElementById('advantage');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    return (
        <div id="advantage" className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
            <h1>Why use our program?</h1>
            <div className={styles.secDiv}>
                <div className={styles.youshi}>
                    <img src={icon1} alt="Decentralized" />
                    <p className={styles.label}>Decentralized</p>
                    <p>Immutable, undeletable</p>
                </div>
                <div className={styles.youshi}>
                    <img src={icon2} alt="Anonymous Privacy" />
                    <p className={styles.label}>Anonymous Privacy</p>
                    <p>No one will know who you are</p>
                </div>
                <div className={styles.youshi}>
                    <img src={icon3} alt="Economic Incentives" />
                    <p className={styles.label}>Economic Incentives</p>
                    <p>You can receive rewards for justice</p>
                </div>
            </div>
        </div>
    );
}

export default Advantage;