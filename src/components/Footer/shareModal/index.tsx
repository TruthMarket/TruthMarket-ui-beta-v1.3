import { FC } from 'react';
import {
    TwitterShareButton,
    FacebookShareButton,
    TelegramShareButton,
    LinkedinShareButton,
} from 'react-share';
import {
    FaTwitter,
    FaFacebook,
    FaTelegram,
    FaLinkedinIn,
    FaTimes
} from 'react-icons/fa';
import styles from './styles.module.scss';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ShareModal: FC<ShareModalProps> = ({ isOpen, onClose }) => {
    const shareUrl = 'https://truthmarket.eth.limo';
    const title = 'Truth Market - Web3.0 Storage and Sale of Crime Truths';

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    <FaTimes />
                </button>
                <h2>Share Truth Market</h2>
                <div className={styles.shareButtons}>
                    <TwitterShareButton url={shareUrl} title={title}>
                        <div className={styles.shareItem}>
                            <FaTwitter size={24} />
                            <span>Twitter</span>
                        </div>
                    </TwitterShareButton>

                    <FacebookShareButton url={shareUrl} hashtag="#TruthMarket">
                        <div className={styles.shareItem}>
                            <FaFacebook size={24} />
                            <span>Facebook</span>
                        </div>
                    </FacebookShareButton>

                    <TelegramShareButton url={shareUrl} title={title}>
                        <div className={styles.shareItem}>
                            <FaTelegram size={24} />
                            <span>Telegram</span>
                        </div>
                    </TelegramShareButton>

                    <LinkedinShareButton url={shareUrl} title={title}>
                        <div className={styles.shareItem}>
                            <FaLinkedinIn size={24} />
                            <span>LinkedIn</span>
                        </div>
                    </LinkedinShareButton>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;