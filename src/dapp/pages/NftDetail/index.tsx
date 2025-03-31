// HomePage.tsx
import React, {
    // useEffect, 
    // useState ,
} from 'react';
import styles from './styles.module.scss';
import { NftDetailProvider } from './useState/nftDetail';
import { useParams, useLocation } from 'react-router-dom';

import { useWalletContext } from '../../context/useAccount/WalletContext';
import ContentLeft from './ContentLeft';
import Storing from './OnStoring/Storing';
import Selling from './OnSelling/Selling';
import Auction from './OnAuction/Auction';
import Delivering from './OnDelivering/Delivering';
import Refunding from './OnRefunding/Refunding';
import Completed from './OnCompleted/Completed';
import Public from './OnPublic/Public';
import AdminFunction from './CheckAllowance/adminDiv';
import ShareSocial from './components/ShareSocial';
import { RoleProvider } from './useState/roleContext/RoleContext';
import { SellFormProvider } from './useState/sellForm';
// import { PermissionProvider } from './useState/permission/PermissionContext';

const NftDetailPage: React.FC = () => {
    const { accountRole } = useWalletContext();
    const { tokenId } = useParams<{ tokenId: string }>();
    const location = useLocation();
    const status = location.state?.status;

    // 将 tokenId 转换为 number 类型
    const numericTokenId = Number(tokenId);

    const renderStatusComponent = () => {
        switch (status) {
            case 'Storing':
                return <Storing tokenId={numericTokenId} />;
            case 'Selling':
                return <Selling tokenId={numericTokenId} />;
            case 'Auctioning':
                return <Auction tokenId={numericTokenId} />;
            case 'Delivering':
                return <Delivering tokenId={numericTokenId} />;
            case 'Refunding':
                return <Refunding tokenId={numericTokenId} />;
            case 'Completed':
                return <Completed tokenId={numericTokenId} />;
            case 'Published':
                return <Public tokenId={numericTokenId} />;
            default:
                return null;
        }
    };

    return (
        <NftDetailProvider>
            <RoleProvider>
                <SellFormProvider>
                    <div className={styles.home}>
                        <div className={styles.container}>
                            <div className={styles.first}>
                                <h3>
                                    Only criminals fear the truth being revealed!
                                </h3>
                            </div>

                            <div className={styles.second}>
                                <div className={styles.content}>
                                    <ContentLeft tokenId={numericTokenId} />

                                    <div className={styles.horizontalLine}></div>
                                    <div className={styles.right}>
                                        {renderStatusComponent()}
                                        <div className={styles.horizontalLine}></div>
                                        {/* 这里需要进行完善，将标题信息和链接给加上！ */}
                                        <ShareSocial
                                            url="https://truthmarket.eth.limo/app/nftDetail/10"
                                            title="Check out this amazing NFT!"
                                        />
                                        <div className={styles.adminFunction}>
                                            {accountRole === 'admin' && <AdminFunction />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </SellFormProvider>
            </RoleProvider>
        </NftDetailProvider>
    );
}

export default NftDetailPage;
