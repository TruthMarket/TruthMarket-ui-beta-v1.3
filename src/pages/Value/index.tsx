// HomePage.tsx
// import React from 'react';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import polymarket from '@assets/image/polymarket.jpg';
import truthmarket from '@assets/image/truthMarket.jpg';
import whoBuy from '@assets/whitepaper/whoBuy.jpg';
import data from '@assets/whitepaper/data.jpg';

function ValuePage() {
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

        const element = document.getElementById('value-container');
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
        <div className={styles.value}>
            <div id="value-container" className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
                <div className={styles.header}>
                    <h2>Web3 should be a revolution in human society!</h2>
                    <p>
                        We firmly believe that blockchain technology can reshape the operational mechanisms of our world,
                        making information more transparent, trustworthy, and efficient.
                    </p>
                </div>

                <div className={styles.horizontalLine}></div>

                <div className={styles.content}>
                    <div className={styles.imgLeft}>
                        <img src={polymarket} alt="Polymarket" />
                        <span>
                            <h3>Predict reality and earn profits!</h3>
                            <p>
                                Due to complex interests and power games, people find it difficult to express their true thoughts. 
                                However, Poly Market has proven that people are more willing to tell the truth in the Web3 world.
                            </p>
                        </span>
                    </div>

                    <div className={styles.imgRight}>
                        <img src={truthmarket} alt="Truth Market" />
                        <span>
                            <h3>Sell crime evidence for rewards!</h3>
                            <p>
                                In the real world, people often avoid participating in justice due to privacy concerns or lack of incentives. 
                                Truth Market is designed to solve these problems.
                            </p>
                        </span>
                    </div>
                </div>

                <div className={styles.horizontalLine}></div>

                <div className={styles.content}>
                    <div className={styles.imgLeft}>
                        <img src={whoBuy} alt="Crypto Market" />
                        <span>
                            <h3>Cryptocurrency is entering garbage time!</h3>
                            <p>
                                Why do most cryptocurrencies keep declining? They're just playing a zero-sum game with funds. 
                                They arbitrarily issue new tokens to exchange for your money, while no one actually needs to use them in reality.
                            </p>
                        </span>
                    </div>

                    <div className={styles.imgRight}>
                        <img src={data} alt="Market Data" />
                        <span>
                            <p>
                                As of February 2025, the Pumpfun platform has issued over 8.1 million tokens, with over 13.8 million participating addresses.
                            </p>
                            <p>
                                Today, there are tens of millions of cryptocurrencies in the market, even more than the number of cryptocurrency practitioners!
                            </p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ValuePage;