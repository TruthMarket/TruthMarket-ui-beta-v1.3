// import { useMintProgressContext } from '../../../provider/MintProgressProvider';
import {
    // ConfigProvider,
    Modal,
    // Button,
} from 'antd';
import {
    useState,
    useEffect,
} from 'react';
import './index.css';
import { useWriteCustorm } from '../../../hooks/useWritCustorm';
import { useUpdateNft_array } from '../../../hooks/useUpdateNft_array';
import { Config_Exchange } from '../../../constants/abiAddress_v1_3';
import { useNftDetailContext } from '../useState/nftDetail';
import { useEncryptoSell } from '../DeEnCrypt/useEncryptSell';
import { useSellFormContext } from '../useState/sellForm';
import { feeToken_State } from '../../../useState/state_feeToken';
// import { useRoleContext } from '../useState/roleContext/RoleContext';
interface Props {
    onClose: () => void;
    openNext: () => void;
}

const ModalSell: React.FC<Props> = ({ onClose, openNext }) => {
    // const { userRole } = useRoleContext() || {}
    const { write, error, isPending, isConfirmed } = useWriteCustorm();
    const { updateNft_array } = useUpdateNft_array();
    const [cancelAble, setCancelAble] = useState<boolean>(false)
    const [okAble, setOkAble] = useState<boolean>(false)
    const [buttonText, setButtonText] = useState<string>('Submit')
    // let currentButtonText:string;
    const encryptoSell = useEncryptoSell();
    const { updateSellForm } = useSellFormContext() || {};
    const [fileCid, setFileCid] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const { nftDetail, nftDetail_two } = useNftDetailContext() || {}

    if (!nftDetail || !nftDetail_two) {
        return <div>loading...</div>
    }

    useEffect(() => {
        if (isConfirmed) {
            setCancelAble(true)
            setOkAble(false)
            setButtonText('Success')
            updateNft_array([nftDetail.tokenId])
        } else if (isPending) {
            setCancelAble(true)
            setOkAble(true)
            setButtonText('wait...')
        } else if (error) {
            setCancelAble(false)
            setButtonText('Submit')
        }
    }, [error, isPending, isConfirmed])

    const handleSell = async () => {
        if (buttonText === 'Success') {
            openNext();
            return;
        }

        if (fileCid && password && price > 1000) {
            const encryptData = await encryptoSell(fileCid, password);
            if (encryptData) {
                const { publicKey_minter, fileCid_iv_office, password_iv_office, fileCid_office, password_office } = encryptData;
                await write({
                    contract: Config_Exchange,
                    functionName: 'Sell',
                    args: [
                        nftDetail.tokenId,
                        price, 
                        publicKey_minter,
                        fileCid_iv_office,
                        password_iv_office,
                        fileCid_office,
                        password_office
                    ],
                });

            } else {
                alert("Encryption failed!")
            }
        } else {
            alert("Empty data!")
        }

    }

    // 输入价格函数
    const handleInputPrice = (value: string) => {
        const p = Number(value) * 10 ** feeToken_State.decimals;
        setPrice(p)
        updateSellForm?.('price', p);
        updateSellForm?.('tokenId', nftDetail.tokenId);
    }

    const handleInputFileCID = (value: string) => {
        setFileCid(value)
        updateSellForm?.('fileCid', value);
    }

    const handleInputPassword = (value: string) => {
        setPassword(value)
        updateSellForm?.('password', value);
    }

    return (

        <Modal
            title="Sell NFT"
            centered
            open={true}
            closable={false}
            maskClosable={false}  // 防止点击遮罩层关闭模态框
            onOk={handleSell}
            onCancel={onClose}
            okButtonProps={{ disabled: okAble }}
            cancelButtonProps={{ disabled: cancelAble }}
            okText={buttonText}
            cancelText="Close"
            width={600}
        >
            <div className='modalContent'>

                <div className='contentDiv'>
                    <span className='spanRow'>
                        <h4>Current tokenId:</h4>
                        <p className='title'>{nftDetail?.tokenId}</p>
                    </span>

                    <div>
                        <span className='spanRow'>
                            <h4 className='lable_input'>fileCID:</h4>
                            <input
                                className='modalInput'
                                type="text"
                                name="uint256"
                                placeholder="Input fileCID"
                                onChange={(e) => handleInputFileCID(e.target.value)}
                            />
                        </span>
                        <span className='spanRow'>
                            <h4 className='lable_input'>Password:</h4>
                            <input
                                className='modalInput'
                                type="text"
                                name="uint256"
                                placeholder="Input password"
                                onChange={(e) => handleInputPassword(e.target.value)}
                            />
                        </span>
                        <span className='spanRow'>
                            <h4 className='lable_input'>Price:</h4>
                            <input
                                className='modalInput'
                                type="text"
                                name="uint256"
                                placeholder="Input price "
                                onChange={(e) => handleInputPrice(e.target.value)}
                            />
                        </span>
                    </div>

                </div>
                <div className='line'></div>
            </div>
        </Modal>

    );
}

export default ModalSell;