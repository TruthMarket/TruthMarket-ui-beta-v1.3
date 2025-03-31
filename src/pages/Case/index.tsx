

// import React from 'react';
import styles from './styles.module.scss';
import TruncatedParagraph from '../../components/TruncatedParagraph';
import img01 from '../../assets/case/1.jpg';
import img02 from '../../assets/case/2.jpg';
import img03 from '../../assets/case/3.jpg';
import img06 from '../../assets/case/6.jpeg';
import ToggleDisplay from './Display/toggleDisplay';

function CasePage() {
    return (
        <div className={styles.example}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <div className={styles.horizontalLine}></div> 
                    <p>Movie Case</p>
                    <div className={styles.horizontalLine}></div> 
                </div>
                <div className={styles.zero}>
                    <p>
                        {/* 众所周知，这个世界上有很多人依靠犯罪获得巨额财富，他们一边犯罪，一边消灭证据和证人。只有真相才能阻止这糟糕的事情。 */}
                        It is well known that many people in this world acquire immense wealth through crime, eliminating evidence and witnesses while committing their offenses. Only the truth can put an end to this terrible situation.
                    </p>
                </div>

                <div className={styles.first}>
                    {/* <div className={styles.videos}>
                        <p>电影名称</p>
                        
                    </div> */}
                    <ToggleDisplay />
                </div>

                <div className={styles.title}>
                    <div className={styles.horizontalLine}></div> 
                    <p>Practical Case</p>
                    <div className={styles.horizontalLine}></div> 
                </div>

                <div className={styles.second}>
                    <div className={styles.news}>
                        <span>
                            <img src={img01} alt="" />
                            <TruncatedParagraph text="In May 2023, the SEC awarded a whistleblower $279 million. The SEC's whistleblower program was established by the Dodd-Frank Act of 2010 to organize and incentivize whistleblowers. The SEC made its first whistleblower award in 2012 and has since paid out over $1 billion in awards." />
                        </span>
                    </div>
                    <div className={styles.news}>
                        <span>
                            <img src={img02} alt="" />
                            <TruncatedParagraph text="A former executive of Deutsche Bank helped U.S. and U.K. regulators investigate Deutsche Bank and received nearly $200 million in rewards. The whistleblower was rewarded for reporting details of the manipulation of the London Interbank Offered Rate (LIBOR) by the bank." />
                        </span>
                    </div>
                    <div className={styles.news}>
                        <span>
                            <img src={img03} alt="" />
                            <TruncatedParagraph text="Jeffrey Epstein was found dead by suicide in a Manhattan jail, adding many questions to an already mysterious case and fueling numerous conspiracy theories." />
                        </span>
                    </div>
                    <div className={styles.news}>
                        <span>
                            <img src={img06} alt="" />
                            <TruncatedParagraph text="South Korean actress Jang Ja-yeon was tortured by high-ranking officials and committed suicide at the age of 29, leaving behind a 230-page will. However, the criminals escaped legal punishment through special means. We believe there are still many silent people who know the truth." />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CasePage;