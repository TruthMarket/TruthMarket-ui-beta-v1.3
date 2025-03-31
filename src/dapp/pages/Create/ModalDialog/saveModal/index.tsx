// import { useMintProgressContext } from '../../../provider/MintProgressProvider';
import {
    // ConfigProvider,
    Modal,
    Button,
} from 'antd';
import {
    useEffect,
    useState,
} from 'react';
import '../index.css';
import { objectToTxtFile } from '@dapp/utils/toTxtFile/toTxt';
import { useNftFormContext } from '../../useState/nftForm';
import { useBoxInfoContext } from '../../useState/boxInfo';
import { useKeyCidPasswContext } from '../../useState/keyCidPassword';
// import { useClearData } from '../workflow/clearData';

interface ModalProps {
    onClose: () => void;
}

const ModalDialogSave: React.FC<ModalProps> = ({ onClose }) => {
    // const { formState } = useNFTformContext() || {};
    const { boxInfoState } = useBoxInfoContext() || {};
    const { cidPasswState } = useKeyCidPasswContext() || {};
    const { nftForm } = useNftFormContext() || {};
    const [isAble, setIsAble] = useState<boolean>(true)

    

    const handleSave = () => {
        // 创建对象副本并删除指定的键
        const jsonStateCopy: Partial<typeof boxInfoState> = { ...boxInfoState };
        delete jsonStateCopy.imageCID;
        // delete jsonStateCopy.eventDate;
        delete jsonStateCopy.description;

        // const keyStateCopy = { ...keyState };

        const filePassStateCopy: Partial<typeof cidPasswState> = { ...cidPasswState };
        // delete filePassStateCopy.fileName;
        delete filePassStateCopy.fileZIP;

        // 合并三个对象
        const mergedObject = {
            ...jsonStateCopy,
            // ...keyStateCopy,
            ...filePassStateCopy
        };

        // 调用 objectToTxtFile 函数
        const result = objectToTxtFile(mergedObject, 'TruthMarket_minter');

        if (result) {
            setIsAble(false);
        } else {
            alert('Save failed!');
        }
    }

    useEffect(() => {
        if (nftForm?.radio === 'Public') {
            setIsAble(false);
        }
    }, [nftForm])

    return (

        <Modal
            title="Upload and Mint"
            centered
            open={true}
            closable={false}
            maskClosable={false}  // 防止点击遮罩层关闭模态框
            // onOk={onClose}
            // onCancel={onClose}
            // okButtonProps={{ disabled: true }}
            // cancelButtonProps={{ disabled:true}}
            footer={[
                <Button key="ok" type="primary" onClick={onClose} disabled={isAble}>
                    Close
                </Button>
            ]}
            width={600}
        >
            {nftForm?.radio === 'Storing' ? (
                <div className='modalContent'>
                    <p className='title'>{boxInfoState?.title}</p>
                    <p className='createTime'> create time: {boxInfoState?.createDate} </p>
                    <div className='contentDiv'>
                        <span className='spanColum'>
                            <h4>Your fileCID:</h4>
                            <p className='key_P'>{cidPasswState?.fileCID}</p>
                        </span>
                        {/* <span className='spanColum'>
                            <h4>Your publicKey:</h4>
                            <p className='key_P'>{keyState?.publicKey}</p>
                        </span> */}
                        <span className='spanColum'>
                            <h4>Zip file passworld:</h4>
                            <p className='key_P'>{cidPasswState?.password}</p>
                        </span>
                    </div>
                    <p className='tips'>
                        These pieces of information are very important! Please make sure to keep it properly.
                    </p>
                    <div className='line'></div>
                    <div className='footer'>
                        <button
                            className='footerButton'
                            onClick={handleSave}
                            style={{ fontSize: '15px', padding: '5px 8px', }}
                        >
                            Save file
                        </button>
                    </div>
                </div>
            ) : (
                <div className='modalContent'>
                    <p className='title'>{boxInfoState?.title}</p>
                    <p className='createTime'> create time: {boxInfoState?.createDate} </p>
                    <div className='contentDiv'>
                        <span className='spanColum'>
                            <h4>Mint Public success!</h4>
                            {/* <p className='key_P'>{keyState?.privateKey}</p> */}
                        </span>
                    </div>
                    <p className='tips'>
                        You have chosen the public mode to mint the NFT, and you do not need to save any files!
                    </p>
                    <div className='line'></div>
                </div>
            )}

        </Modal>

    );
}

export default ModalDialogSave;