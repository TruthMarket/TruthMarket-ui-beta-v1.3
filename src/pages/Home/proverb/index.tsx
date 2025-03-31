import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

function Proverb() {
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

        const element = document.getElementById('proverb');
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
        <div id="proverb" className={`${styles.proverb} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.content}>
                <p className={styles.first}>
                    The sooner the truth is revealed, the fewer the tragedies!
                </p>
                <p className={styles.second}>
                    A lie requires countless other lies to cover it up, and a crime needs numerous other crimes to hide it.
                </p>
            </div>
        </div>
    );
}

export default Proverb;
