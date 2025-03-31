// import React from 'react';
import styles from '../styles.module.scss';

// import { NftDetailType } from '../../../type/contractDate';
import { 
    useState, 
    // useEffect 
} from 'react';
// import CountdownTimer from '../CountdownTimer';
import Button from '../Button';
// import { feeToken_State } from '../../../useState/state_feeToken';
// import {
//     Config_Exchange,
    // Config_ConfidentialityFee,
    // Config_TruthBox,
// } from '../../../constants/abiAddress_v1_3';
import { useNftDetailContext } from '../useState/nftDetail';
// import { decimals } from '../../../useReadWrite/feeToken/readData';
// import { useUpdateNft_array } from '../../../hooks/useUpdateNft_array';
import StatusStep from '../components/StatusStep/statusStep';

import { useRoleContext } from '../useState/roleContext/RoleContext';
// import { useWriteCustorm } from '../../../hooks/useWritCustorm';
// import { useWalletContext } from '../../../context/useAccount/WalletContext';
import ModalSell from './modalSell';
import ModalAuction from './modalAuction';
import ModalPublicStoring from '../Modal/modalPublicStoring';
// import ModalViewData from '../Modal/modalViewData';
import ModalSaveKey from '../Modal/modalSaveKey';
import { useButtonDisabled } from '../hooks/useButtonDisabled';

interface Props {
    tokenId: number,
}

type ActiveButton = 'Sell' | 'Auction' | 'Public' | 'SaveKey' | 'ViewData'| null;

const Storing: React.FC<Props> = ({ tokenId }) => {
    // const { accountRole } = useWalletContext()||{}
    // const { write, error, isPending, isConfirmed } = useWriteCustorm();
    // const {updateNft_array}=useUpdateNft_array();
    const { nftDetail, nftDetail_two } = useNftDetailContext() || {};
    const { userRole } = useRoleContext() || {};
    const [activeButton, setActiveButton] = useState<ActiveButton>(null);

    const [ModalOpen, setModalOpen] = useState<ActiveButton>(null);

    const { 
        sellDisabled, 
        auctionDisabled, 
        publicStoringDisabled , 
        // viewDataDisabled_minter
    } = useButtonDisabled(tokenId);

    if (!nftDetail || !nftDetail_two) {
        return <div>loading...</div>
    }

    const openModalSaveKey = () => {
        setModalOpen('SaveKey');
        setActiveButton(null);
    };

    const closeModal = () => {
        setModalOpen(null);
        setActiveButton(null);
    };

    // 根据status渲染对应的组件
    const handleSell = async () => {
        setActiveButton('Sell');
        setModalOpen('Sell')
        
    };

    const handleAuction = async () => {
        setActiveButton('Auction');
        setModalOpen('Auction');
        
    };

    const handlePublic = async () => {
            setActiveButton('Public');
            setModalOpen('Public')
    }

    const openViewDataModal = async () => {
        setActiveButton('ViewData');
        setModalOpen('ViewData')
    }

    // useEffect(() => {
    //     if (isConfirmed ) {
    //         setActiveButton(null);
    //         updateNft_array([tokenId]);
    //     } else if (error) {
    //         setActiveButton(null);
    //     }
    // }, [error, isPending, isConfirmed]);


    return (
        <>

            <StatusStep status='Storing'/>
            <div className={styles.horizontalLine}></div>

            <div className={styles.horizontalLine}></div>
            <div className={styles.buttonBar}>
                <div className={styles.userRole}>
                    <h4>You are: {userRole}</h4>
                    <p>
                        Only minter can sell that box.
                    </p>
                </div>
                <span className={styles.buttonOne}>
                    <Button
                        text='Sell'
                        useFor='one'
                        onClick={handleSell}
                        isLoading={activeButton === 'Sell'}
                        disabled={sellDisabled(activeButton)}
                    />
                    <Button
                        text='Auction'
                        useFor='one'
                        onClick={handleAuction}
                        isLoading={activeButton === 'Auction'}
                        disabled={auctionDisabled(activeButton)}
                    />
                </span>
                <span className={styles.buttonTwo}>
                    <Button
                        text='Public'
                        useFor='two'
                        onClick={handlePublic}
                        isLoading={activeButton === 'Public'}
                        disabled={publicStoringDisabled(activeButton)}
                    />
                    <Button
                        text='Wait'
                        useFor='one'
                        onClick={openViewDataModal}
                        isLoading={true}
                        disabled={true}
                    />
                </span>

            </div>
            {/* {nftDetail_two.overDeadline ? (
                <p className='attention'>
                    The NFT deadline is over, can't ExtendStoring !
                </p>) : (
                <p className='tipsFee'>
                    If you want to ExtendStoring, you must pay storage fee.
                </p>
            )} */}
            {nftDetail_two.isBlackTokenId && <p className='attention'>The NFT in blackList, can't do anything !</p>}

            {/* <p className='tips'>
                If you are not the minter, <br />
                you can only proceed with the sale or public actions after the countdown ends. <br />
                If a final transaction occurs, you can receive a certain percentage of the return.
            </p> */}
            {(ModalOpen === 'Sell') && <ModalSell onClose={closeModal} openNext={openModalSaveKey} />}
            {(ModalOpen === 'Auction') && <ModalAuction onClose={closeModal} openNext={openModalSaveKey} />}
            {(ModalOpen === 'Public') && <ModalPublicStoring tokenId={tokenId} onClose={closeModal} />}
            {(ModalOpen === 'SaveKey') && <ModalSaveKey onClose={closeModal} />}
            {/* {(ModalOpen === 'ViewData') && <ModalViewData tokenId={tokenId} onClose={closeModal} />} */}
            
        </>
    );
}

export default Storing;
