

// HomePage.tsx
// import React from 'react';
import styles from './styles.module.scss';
// import img01 from '../../assets/image/1.jpg';
// import img02 from '../../assets/image/2.jpg';
import data from './data.ts';

function StoryPage() {
    return (
        <div className={styles.story}>
            <div className={styles.container}>
                <p className={styles.introduce}>
                    Although this is not a true story, every story is inspired by real life.
                </p>
                <div className={styles.horizontalLine}></div> 
                <div className={styles.third}>
                    
                    {
                        data.map((item, index) => {
                            return (
                                <div key={index} className={item.id % 2 === 0 ? styles.imgRight : styles.imgLeft}>
                                    {item.id % 2 !== 0 ? (
                                        <>
                                            <img src={item.img} alt="image" />
                                            <span className={item.id % 2 === 0 ? styles.spanRight : styles.spanLeft}>
                                                <p className={styles.textp}>No:{item.id}</p>
                                                <p>{item.text}</p>
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className={item.id % 2 === 0 ? styles.spanRight : styles.spanLeft}>
                                                <p className={styles.textp}>No:{item.id}</p>
                                                <p>{item.text}</p>
                                            </span>
                                            <img src={item.img} alt="image" />
                                        </>
                                    )}
                                </div>
                            );
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default StoryPage;