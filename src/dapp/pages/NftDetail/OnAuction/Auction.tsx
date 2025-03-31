import React, { useState, useEffect } from 'react';
import styles from '../styles.module.scss';
import { useUpdateNft_array } from '../../../hooks/useUpdateNft_array';
import CountdownTimer from '../CountdownTimer';
import Button from '../Button';
import { useNftDetailContext } from '../useState/nftDetail';
import { useRoleContext } from '../useState/roleContext/RoleContext';
import { feeToken_State } from '../../../useState/state_feeToken';
import { useWriteCustorm } from '../../../hooks/useWritCustorm';
import {
    Config_FundManager,
    Config_feeToken,
    Config_Exchange,
} from '../../../constants/abiAddress_v1_3';
import ModalBuyerKey from '../Modal/modalBuyerKey';
import { useWalletContext } from '../../../context/useAccount/WalletContext';
import { useGetBuyerKey } from '../hooks/useGetBuyerKey';
import CalcMoney from './CalcMoney';
import ModalDeliver from '../Modal/modalDeliver';
import ModalPublic from '../Modal/modalPublic';
import ModalViewData from '../Modal/modalViewData';
import { useButtonDisabled } from '../hooks/useButtonDisabled';
import { useTokenAllowance } from '../hooks/useAllowance';
import { statusAbled } from '../Modal/modalBuyerKey';
import StatusStep from '../components/StatusStep/statusStep';

interface Props {
    tokenId: number,
}

type ActiveButton = 'Admin' | 'Approve'| 'Bid' | 'Public' | 'Deliver' | 'ViewData'| null;

const Auction: React.FC<Props> = ({ tokenId }) => {
    const { address } = useWalletContext() || {}
    // const { permission } = usePermissionContext() || {}
    const { nftDetail } = useNftDetailContext() || {};
    const { userRole } = useRoleContext() || {};
    const { write, error, isPending, isConfirmed } = useWriteCustorm();
    const {updateNft_array}=useUpdateNft_array();
    const [activeButton, setActiveButton] = useState<ActiveButton>(null);

    const [buttonText, setButtonText] = useState<string>('Bid');
    const [currentText, setCurrentText] = useState<string>('');

    const [ModalOpen, setModalOpen] = useState<string | null>(null);
    const [status, setStatus] = useState<statusAbled>('isPending');
    const { getBuyerKey, buyerInfo } = useGetBuyerKey();
    const { 
        bidDisabled, 
        deliverAuctionDisabled, 
        publicNobuyerDisabled, 
        // viewDataDisabled_minter 
    } = useButtonDisabled(tokenId);

    if (!nftDetail) {
        return <div>loading...</div>
    }
    // 检查token是否需要授权
    const isAllowance = useTokenAllowance(nftDetail.price);

    useEffect(() => {
        if (isAllowance) {
            setButtonText('Bid');
        } else {
            setButtonText('Approve');
        }
    }, [isAllowance])


    useEffect(() => {
        if (isConfirmed) {
            setActiveButton(null);
            if (currentText === 'Bid') {
                setButtonText('Success');
                setStatus('isConfirmed')
                updateNft_array([tokenId])
            } else if (currentText === 'Approve') {
                setButtonText('Bid');
                setCurrentText('Bid');
            }
            
        } else if (isPending) {
            setModalOpen('BuyerKey'); // ***********
            setStatus('isPending')
            // setButtonText('wait...')
        } else if(error){
            // 恢复到操作前的状态
            setActiveButton(null);
            setStatus('error');
            if (currentText === 'Bid') {
                setButtonText('Bid');
            } else if (currentText === 'Approve') {
                setButtonText('Approve');
            }
        }
    }, [error, isPending, isConfirmed])

    const handleDiliver = async () => {
        setActiveButton('Deliver');
        if (userRole === 'minter' || userRole === 'admin') {
            setModalOpen('Deliver')
        } else {
            await write({
                contract: Config_Exchange,
                functionName: 'DeliverOverdue',
                args: [tokenId],
            });
        }

    };
    

    const handleBid = async () => {
        setActiveButton('Bid');
        if (buttonText === 'Bid') {
            setCurrentText('Bid');
            const publicKey_buyer = await getBuyerKey(tokenId, 'bidder');
            if (!publicKey_buyer) {
                alert('Get publicKey_buyer failed!')
            }
            // setModalOpen('BuyerKey');
            await write({
                contract: Config_Exchange,
                functionName: 'Bid',
                args: [tokenId, publicKey_buyer],
            });

        } else if (buttonText === 'Approve') {
            setCurrentText('Approve');
            await write({
                contract: Config_feeToken,
                functionName: 'approve',
                args: [Config_FundManager.address, 99999999999999],
            });
        }
    }

    const closeModal = () => {
        setModalOpen(null);
        setActiveButton(null);
    };

    const openViewDataModal = async () => {
        setActiveButton('ViewData');
        setModalOpen('ViewData')
    }

    const handlePublic = async () => {
        setActiveButton('Public');
        setModalOpen('Public')
    }

    return (

        <>
            <StatusStep status='Auctioning' />
            <div className={styles.horizontalLine}></div>
            <div className={styles.priceBar}>
                <p>Price:</p>
                <p className={styles.priceNumber}>{nftDetail.price}</p>
                <p>{feeToken_State.symbol}</p>
            </div>

            <CountdownTimer time={nftDetail.deadline} />
            <div className={styles.horizontalLine}></div>
            <div className={styles.buttonBar}>
                <div className={styles.userRole}>
                    <h4>You are: {userRole}</h4>
                </div>
                <span className={styles.buttonOne}>
                    <Button
                        text={buttonText}
                        useFor='one'
                        onClick={handleBid}
                        isLoading={activeButton === 'Bid' }
                        disabled={bidDisabled(activeButton) ?? true}
                    />
                    <Button
                        text='Deliver'
                        useFor='one'
                        onClick={handleDiliver}
                        isLoading={activeButton === 'Deliver'}
                        disabled={deliverAuctionDisabled(activeButton)}
                    />
                </span>
                <span className={styles.buttonTwo}>
                    <Button
                        text='ViewData'
                        useFor='one'
                        onClick={openViewDataModal}
                        isLoading={activeButton === 'ViewData'}
                        disabled={false}
                    />
                    <Button
                        text='Public'
                        useFor='two'
                        onClick={handlePublic}
                        isLoading={activeButton === 'Public'}
                        disabled={publicNobuyerDisabled(activeButton)}
                    />
                </span>
            </div>
            <p>
                After the auction period expires, <br />
                if no one participates in the bidding,<br />
                then it can be executed publicly.
            </p>
            {
                (address && userRole !== 'minter') && <CalcMoney tokenId={tokenId} address={address} />
            }

            {(ModalOpen === 'Deliver') && <ModalDeliver tokenId={tokenId} onClose={closeModal} />}
            {(ModalOpen === 'Public') && <ModalPublic tokenId={tokenId} onClose={closeModal} />}
            {(ModalOpen === 'ViewData') && <ModalViewData tokenId={tokenId} onClose={closeModal} />}
            
            {(ModalOpen === 'BuyerKey') &&
                <ModalBuyerKey
                    onClose={closeModal}
                    buyerInfo={buyerInfo}
                    status = {status}
                />
            }
        </>
    );
}

export default Auction;
