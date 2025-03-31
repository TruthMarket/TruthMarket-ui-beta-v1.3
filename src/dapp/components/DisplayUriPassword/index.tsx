
import {FC, useEffect, useState} from 'react';
import styles from './styles.module.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { NftDetailType } from '../../type/contractDate';
import { CopyOutlined } from '@ant-design/icons';
import { ipfsCidToUrl } from '../../utils/ipfsCidToUrl';

interface Props {
    // nft: NftDetailType;
    fileCid:string;
    password:string;
}

export const DisplayUriPassword: FC<Props> = ({fileCid,password}) => {

    const [fileUri,setFileUri] = useState<string>('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(()=>{
        if (fileCid) {
            const uri = ipfsCidToUrl(fileCid);
            setFileUri(uri);
        }

    },[fileCid])

    const handleCopy = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        setTooltipPosition({ x: clientX, y: clientY });
        setShowTooltip(true);
        
        // 1秒后隐藏提示
        setTimeout(() => {
            setShowTooltip(false);
        }, 1000);
    };

    return (
        <>
            <div className={styles.filePassword}>
                <div className={styles.copyItem}>
                    <CopyToClipboard text={fileUri || ''} onCopy={() => { }}>
                        <div className={styles.copyContent} onClick={handleCopy}>
                            <span>File: {fileUri}</span>
                            <CopyOutlined />
                        </div>
                    </CopyToClipboard>
                </div>
                <div className={styles.copyItem}>
                    <CopyToClipboard text={password || ''} onCopy={() => { }}>
                        <div className={styles.copyContent} onClick={handleCopy}>
                            <span>Password: {password}</span>
                            <CopyOutlined />
                        </div>
                    </CopyToClipboard>
                </div>
            </div>

            {showTooltip && (
                <div
                    className={styles.tooltip}
                    style={{
                        left: tooltipPosition.x + 'px',
                        top: (tooltipPosition.y - 30) + 'px'
                    }}
                >
                    Copied!
                </div>
            )}
        </>
    )
}