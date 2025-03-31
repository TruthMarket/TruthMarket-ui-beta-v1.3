
// import React from 'react'
import styles from './styles.module.scss'
import different from '@assets/whitepaper/different.jpg'
import data from '@assets/whitepaper/data.jpg'
import whoBuy from '@assets/whitepaper/whoBuy.jpg'
import criminalBuy from '@assets/whitepaper/criminalBuy.jpg'

function Value() {
    return (
        <div className={styles.navr}>
            <h1 className={styles.title}>Investment Value</h1>
            <p>
                Truth Market has a very robust economic model and real demand scenarios. This is the key difference between Truth Market and the current cryptocurrencies.
            </p>
            <span className={styles.imageOne}>
                <img src={different} alt="" />
            </span>
            <p>
                In the current cryptocurrency market, over 99.99% of projects lack genuine demand, and most investors pursue short-term profits, leading to rapid fluctuations in investment trends. Many investors operate without clear use cases, and the market lacks a stable support foundation. Investor enthusiasm often relies on price surges, which can result in a "death spiral" when large investors take their profits and exit the market.
            </p>
            <span className={styles.imageOne}>
                <img src={data} alt="" />
            </span>
            <span className={styles.imageOne}>
                <img src={whoBuy} alt="" />
            </span>
            <p>
                In contrast, Truth Market offers a practical solution by integrating blockchain technology with criminal activities, addressing the societal imperative for legal justice. The project's innovation and close ties to the real world make it attractive in the investment landscape.
            </p>
            <p>
                Here, I must once again commend Poly Market for setting a good example of the integration of Web3 with the real world. In contrast, the challenges faced by Truth Market are more complex, focusing on revealing issues related to crime and truth. It is noteworthy that many people around the world rely on wealth obtained through crime, which motivates us even more to unveil the truths hidden in the darkness.
            </p>
            
            <span className={styles.imageOne}>
                <img src={criminalBuy} alt="" />
            </span>
            
            <p>
                
                Truth Market creates a real-world scenario in Web3 that involves crime, interests, truth, and legal penalties. Imagine a criminal who is constantly worried about whether law enforcement has obtained evidence of their crimes, fearing legal sanctions and judgments. In this situation, if they discover a Truth Box on Truth Market that may contain incriminating evidence against them, their concern for personal safety provides them with sufficient reason to purchase that Truth Box, ensuring that their criminal evidence is not in the hands of others. This is the underlying logic of the value of Truth Market.
            </p>
            <p>
                
                It is worth noting that the economic losses caused by crime worldwide amount to trillions of dollars each year. Therefore, Truth Market is not only an exploratory project that combines blockchain and legal systems but also a new type of economic model for the future—an economy based on criminal evidence. This economic model is expected to become more mature in the future.
            </p>
            
        </div>
    )
}

export default Value;