import { FC, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import {
    FaTwitter,
    FaDiscord,
    FaGithub,
    FaShare,
    FaEnvelope
} from 'react-icons/fa';

import data from './data';
import ShareModal from './shareModal';
// import tiwtter from '../../assets/icon/tiwtter01.svg';
// import telegram from '../../assets/icon/telegram01.svg';
// import discode from '../../assets/icon/discode01.svg';

const Footer: FC = () => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    

    const [randomQuote, setRandomQuote] = useState(data[0]);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomQuote(data[randomIndex]);
    }, []); // 只在组件挂载时执行一次

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <span className={styles.mingyan}>
                    <p className={styles.first}>
                        {randomQuote.proverb}
                    </p>
                    <p className={styles.sencond}>
                        ——————{randomQuote.from}
                    </p>
                </span>
                <span className={styles.media}>
                    <p>Social media</p>
                    <span>
                        <a
                            href="https://x.com/LabsTruth90148" target="_blank" rel="noreferrer">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://github.com/TruthMarket" target="_blank" rel="noreferrer">
                            <FaGithub size={24} />
                        </a>
                        <a href="https://discord.gg/KVDs7CFSr2" target="_blank" rel="noreferrer">
                            <FaDiscord size={24} />
                        </a>
                        <a href="mailto:truthmarket@proton.me" target="_blank" rel="noreferrer">
                            <FaEnvelope size={24} />
                        </a>
                        <button onClick={() => setIsShareModalOpen(true)}>
                            <FaShare size={24} />
                        </button>
                    </span>

                </span>

            </div>
            <ShareModal 
                isOpen={isShareModalOpen} 
                onClose={() => setIsShareModalOpen(false)} 
            />
        </footer>
    );
}

export default Footer;