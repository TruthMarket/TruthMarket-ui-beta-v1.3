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
// import './index.css';
// import { useWriteContract } from 'wagmi';
// import { useWriteCustorm } from '../../../hooks/useWritCustorm';
import { DisplayUriPassword } from '../../../components/DisplayUriPassword';
import { useNftDetailContext } from '../useState/nftDetail';
import { useRoleContext } from '../useState/roleContext/RoleContext';
// import { PublicKey_buyer } from '../../../useReadWrite/exchange/readExchange';
import { useDecrypt } from '../DeEnCrypt/useDecryptSee';
// import { useWalletContext } from '../../../context/useAccount/WalletContext';

interface Props {
    tokenId: number,
    onClose: () => void;
}

const ModalViewData: React.FC<Props> = ({ tokenId, onClose }) => {
    // const { accountRole } = useWalletContext() || {}
    const { nftDetail } = useNftDetailContext() || {};
    const { userRole } = useRoleContext() || {};
    const decrypt = useDecrypt();
    // const { write, error, isPending, isConfirmed } = useWriteCustorm();
    const [fileCid, setFileCid] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isAble, setIsAble] = useState<boolean>(false)
    const [okText, setOkText] = useState<string>('Submit')
    // const [publicKey_minter, setPublicKey_minter] = useState<string>('')
    const [privateKey_user, setPrivateKey_user] = useState<string>('')

    if (!nftDetail) {
        return <div>loading...</div>
    }

    useEffect(() => {
        if (fileCid && password) {
            setIsAble(false)
            setOkText('Success')
        }
    }, [fileCid, password]);


    const handlePublic = async () => {
        if (okText !== 'Submit') {
            return;
        }
        setOkText('wait...')
        setIsAble(true)
        const result = await decrypt(tokenId, privateKey_user);
        if (!result) {
            alert('Decryption failed!');
            setIsAble(false)
            return;
        }
        const { fileCid, password } = result;
        setFileCid(fileCid);
        setPassword(password);

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
            onOk={handlePublic}
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
                        <p className='title'>You are:</p>
                        <h4>{userRole}</h4>
                    </span>
                    <div className='line'></div>
                    <div>
                        <p className='tips'>Please enter the private key from the previously minted files.</p>
                        <p className='tips'>"The file name should start with 'TruthMarket'."</p>
                        <span className='spanColum'>
                            <h4>privateKey:</h4>
                            <textarea
                                className='inputKey'
                                name="bytes"
                                placeholder={`You are ${userRole}, input ${userRole}  privateKey`}
                                onChange={(e) => inputPrivateKey(e.target.value)}
                            />
                        </span>
                        <p className='tips'>The format of the private key is: 0x........</p>
                    </div>

                </div>
                <div className='line'></div>
                <DisplayUriPassword fileCid={fileCid} password={password} />
                <div className='line'></div>
            </div>
        </Modal>

    );
}

export default ModalViewData;