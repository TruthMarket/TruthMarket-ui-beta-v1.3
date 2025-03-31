import React from 'react';
import { TwitterOutlined, FacebookOutlined } from '@ant-design/icons';
import { FaTelegram, FaDiscord } from 'react-icons/fa';
import styles from './styles.module.scss';

interface ShareSocialProps {
    url: string;
    title: string;
}

const ShareSocial: React.FC<ShareSocialProps> = ({ url, title }) => {
    // 编码 URL 和标题
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    // 各平台分享链接
    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
        discord: `https://discord.com/channels/@me`  // Discord 不支持直接分享链接
    };

    // 处理分享点击
    const handleShare = (platform: string, link: string) => {
        if (platform === 'discord') {
            // Discord 特殊处理，可以复制到剪贴板
            navigator.clipboard.writeText(`${title}\n${url}`);
            return;
        }
        
        // 打开新窗口分享
        window.open(link, '_blank', 'width=600,height=400');
    };

    return (
        <div className={styles.shareContainer}>
            <div className={styles.shareTitle}>Share:</div>
            <div className={styles.shareButtons}>
                <button 
                    className={`${styles.shareButton} ${styles.twitter}`}
                    onClick={() => handleShare('twitter', shareLinks.twitter)}
                    aria-label="Share on Twitter"
                >
                    <TwitterOutlined />
                </button>
                
                <button 
                    className={`${styles.shareButton} ${styles.facebook}`}
                    onClick={() => handleShare('facebook', shareLinks.facebook)}
                    aria-label="Share on Facebook"
                >
                    <FacebookOutlined />
                </button>
                
                <button 
                    className={`${styles.shareButton} ${styles.telegram}`}
                    onClick={() => handleShare('telegram', shareLinks.telegram)}
                    aria-label="Share on Telegram"
                >
                    <FaTelegram />
                </button>
                
                <button 
                    className={`${styles.shareButton} ${styles.discord}`}
                    onClick={() => handleShare('discord', shareLinks.discord)}
                    aria-label="Share on Discord"
                >
                    <FaDiscord />
                </button>
            </div>
        </div>
    );
};

export default ShareSocial;
