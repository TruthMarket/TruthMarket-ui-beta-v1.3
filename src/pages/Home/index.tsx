// HomePage.tsx
// import React from 'react';
import styles from './styles.module.scss';
import hacker from '../../assets/image/swiper01.png';
// import swiper01 from '../../assets/image/swiper01.png';
// import swiper02 from '../../assets/image/swiper02.png';
// import swiper03 from '../../assets/image/swiper03.png';
// import TopSwiper from './topSwiper';
import Proverb from './proverb';
import data from './data';
import DisplayCard from './displayCard';
import Advantage from './advantage';

function HomePage() {
    // const handleClick = () => {
    //     window.location.href = 'https://juicebox.money/v2/p/779';
    // };

    // const swiperItems = [
    //     {
    //         image: swiper01,
    //         title: 'Are you afraid of the truth?',
    //         description: 'Discover the future of digital asset trading'
    //     },
    //     {
    //         image: swiper02,
    //         title: 'Julian Paul Assange',
    //         description: 'Hacker Robin Hood reveals political truth'
    //     },
    //     {
    //         image: swiper03,
    //         title: 'Edard Snoden',
    //         description: 'Disclose the truth about the PRISM surveillance project'
    //     },
    //     // ... 
    // ];

    return (
        <div className={styles.home}>
            <div className={styles.first}>
                <div className={styles.title}>
                    <span>
                        <h1 className={styles.title01}>Truth</h1>
                        <h1 className={styles.title02}>Market</h1>
                    </span>
                    <div className={styles.subtitle}>
                        <p>Web3.0 Storage, trade and publicly disclose of Crime Truths</p>
                        <p>The truth is valuable and should also have a price.</p>

                    </div>
                </div>
                <div className={styles.hackerDiv}>
                    <img src={hacker} alt="image" />
                    <div className={styles.hackerText}>
                        <p>Are you afraid of the truth?</p>
                        <p>Do you want to reveal the truth?</p>
                    </div>
                </div>
                {/* <TopSwiper items={swiperItems} interval={5000} /> */}
            </div>

            <div className={styles.second}>
                <Proverb />
                <div className={styles.horizontalLine}></div>
                <div className={styles.cardContent}>
                {data.map((item,index) => (
                    <DisplayCard
                        id={index}
                        data={item}
                    />
                ))}
                </div>
                <div className={styles.horizontalLine}></div>
                <Advantage />
            </div>
        </div>
    );
}

export default HomePage;