// import { useMintProgressContext } from '../../../provider/MintProgressProvider';
import {
    // ConfigProvider,
    Modal,
    // Button,
} from 'antd';
import {
    useState,
    useEffect,
    useContext,
} from 'react';
// import './index.css';
import { ContractContext } from '../../../context';
import { useUpdateNft_array } from '../../../hooks/useUpdateNft_array';
import { useWriteCustorm } from '../../../hooks/useWritCustorm';
import { Config_Exchange } from '../../../constants/abiAddress_v1_3';
import { useNftDetailContext } from '../useState/nftDetail';
import { useRoleContext } from '../useState/roleContext/RoleContext';
// import { PublicKey_buyer } from '../../../useReadWrite/exchange/readExchange';
import { useEnCryptDeliver,} from '../DeEnCrypt/useEncryptDeliver';
// import { useWalletContext } from '../../../context/useAccount/WalletContext';
// import { usePermissionContext } from '../useState/permission/PermissionContext';

interface Props {
    tokenId: number,
    onClose: () => void;
}

const ModalRefuse: React.FC<Props> = ({ tokenId, onClose }) => {
    // const { accountRole } = useWalletContext() || {}
    const { nftDetail } = useNftDetailContext() || {};
    const { userRole } = useRoleContext() || {};
    const encryptoDeliver = useEnCryptDeliver();
    const {updateNft_array}=useUpdateNft_array();
    const { write, error, isPending, isConfirmed } = useWriteCustorm();
    const {PublicKey_buyer} = useContext(ContractContext);
    const [isAble, setIsAble] = useState<boolean>(false)
    const [okText, setOkText] = useState<string>('Submit')
    // const [publicKey_minter, setPublicKey_minter] = useState<string>('')
    const [privateKey_user, setPrivateKey_user] = useState<string>('')
    const [key_buyer, setKey_buyer] = useState<string>('')

    if (!nftDetail) {
        return <div>loading...</div>
    }

    useEffect(()=>{
        const fatch = async () => {
            const publicKey_buyer= await PublicKey_buyer(tokenId);
            setKey_buyer(publicKey_buyer);
        }
        fatch();
    },[])

    useEffect(() => {
        if (isConfirmed || error) {
            setIsAble(false)
            setOkText('Submit')
            updateNft_array([tokenId])
        } else if (isPending) {
            setIsAble(true)
            setOkText('wait...')
        } else if (error) {
            setIsAble(false)
            setOkText('Submit')
        } 
    }, [error, isPending, isConfirmed]);

    const handleRefuse = async () => {
        setOkText('wait...')
        setIsAble(true)

        const result = await encryptoDeliver(tokenId, key_buyer, privateKey_user);
        if (!result) {
            alert('Decryption failed!');
            return;
        }
        const { fileCid_iv_buyer, fileCid_buyer, password_iv_buyer, password_buyer } = result;
        await write({
            contract: Config_Exchange,
            functionName: 'RefuseRefund',
            args: [
                tokenId,
                fileCid_iv_buyer,
                password_iv_buyer,
                fileCid_buyer,
                password_buyer
            ]
        });

    }

    const inputPrivateKey = (value: string) => {
        setPrivateKey_user(value)
    }

    return (

            <Modal
                title="Public NFT"
                centered
                open={true}
                closable={false}
                maskClosable={false}  // 防止点击遮罩层关闭模态框
                onOk={handleRefuse}
                onCancel={onClose}
                okButtonProps={{ disabled: isAble }}
                cancelButtonProps={{ disabled: isAble }}
                okText={okText}
                cancelText="Close"
                width={600}
            >
                <div className='modalContent'>

                    <div className='contentDiv'>
                        <span className='spanRow'>
                            <p className='title'>tokenId:</p>
                            <h4>{nftDetail.tokenId}</h4>
                        </span>
                        <span className='spanColum'>
                            <h4>PublicKey_buyer:</h4>
                            <p className='title'>{key_buyer}</p>
                        </span>
                        <div className='line'></div>
                        {
                            key_buyer ? (
                                <div>
                                    <p className='tips'>Please enter the private key_office corresponding to the current tokenId.</p>
                                    <span className='spanColum'>
                                        <h4>privateKey_office:</h4>
                                        <textarea
                                            className='inputKey'
                                            name="bytes"
                                            placeholder={`You are ${userRole}, input ${userRole}  privateKey`}
                                            onChange={(e) => inputPrivateKey(e.target.value)}
                                        />
                                    </span>
                                    <p className='tips'>The format of the private key is: 0x........</p>
                                </div>
                            ) : (
                                <p className='tips'>PublicKey_buyer is null, So you can`t do anything!</p>
                            )
                        }
                    </div>
                    <div className='line'></div>
                </div>
            </Modal>

    );
}

export default ModalRefuse;