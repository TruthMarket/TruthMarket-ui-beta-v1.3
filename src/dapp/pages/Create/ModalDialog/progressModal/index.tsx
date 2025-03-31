import { useProgressContext } from '../../useState/progress';
// import ProgressBar from '../../../components/ProgressBar/progressBar';
import {
    // ConfigProvider,
    Modal,
    Progress,
    Spin,
    Button,
} from 'antd';
import '../index.css';
import {
    // CheckCircleOutlined,
    // CloseCircleOutlined,
    LoadingOutlined,
} from '@ant-design/icons'
// import { useNftFormContext } from '../useState/nftForm';
import ResultApp from '@dapp/components/Result';

interface ModalProps {
    onClose: () => void;
}

const ModalDialogProgress: React.FC<ModalProps> = ({ onClose }) => {
    // const [open, setOpen] = useState(true);
    // const { nftForm } = useNftFormContext() || {};
    const { mintProgress } = useProgressContext() || {};

    // const radio = nftForm?.radio;

    const compressIsLoading = mintProgress?.compressIsLoading;
    // const fileIsLoading = mintProgress?.upload_FileIsLoading;
    // const imageIsLoading = mintProgress?.upload_ImageIsLoading;
    const jsonIsLoading = mintProgress?.upload_JsonIsLoading;
    const urlIsLoading = mintProgress?.upload_UrlIsLoading;

    // const encryptIsLoading = mintProgress?.encryptedIsLoading;
    const mintIsLoading = mintProgress?.mint_NftIsLoading;

    const fileProgress = mintProgress?.upload_FileProgress;
    const imageProgress = mintProgress?.upload_ImageProgress;
    // const jsonProgress = mintProgress?.upload_JsonProgress;
    // const urlProgress = mintProgress?.upload_UrlProgress;

    const compressError = mintProgress?.compressError;
    const fileError = mintProgress?.upload_FileError;
    const imageError = mintProgress?.upload_ImageError;
    const jsonError = mintProgress?.upload_JsonError;
    const urlError = mintProgress?.upload_UrlError;
    // const encryptError = mintProgress?.encrypted_Error;

    const mintError = mintProgress?.mint_NftError;

    const isComplete = mintProgress?.isComplete;

    return (

        <Modal
            title="Upload and Mint"
            centered
            open={true}
            closable={false}
            // onOk={onClose}
            maskClosable={false}  // 防止点击遮罩层关闭模态框
            footer={[
                <Button key="ok" type="primary" onClick={onClose} disabled={!isComplete}>
                    Next
                </Button>
            ]}
            width={600}
        >
            <div className='modalProgress'>
                {isComplete ? (
                    <p className='tips'> Complete! Now you can close that page!</p>
                ) : (
                    <p className='tips'> Please Wait, Don`t exit that page!</p>
                )}
                <div className='line'></div>
                <div>
                    <p className='lable'>Compression file</p>
                    {compressIsLoading ? (
                        <ResultApp args='success' />
                    ) : (
                        <Spin indicator={<LoadingOutlined spin />} size="large" />
                    )}
                    <p style={{ fontSize: '15px', color: 'yellow' }}>{compressError}</p>
                </div>
                <div>
                    <p className='lable'>Upload file</p>
                    {/* {fileIsLoading && <Spin indicator={<LoadingOutlined spin />} size="large" />} */}
                    {/* {fileError ? <CloseCircleOutlined twoToneColor="#52c41a"/> : <CheckCircleOutlined twoToneColor="#52c41a"/>} */}
                    {/* <ProgressBar progress={fileProgress ?? 0} /> */}
                    <Progress strokeColor="#faad14" percent={fileProgress} size={[500, 25]} />
                    <p style={{ fontSize: '15px', color: 'yellow' }}>{fileError}</p>
                </div>
                <div>
                    <p className='lable'>Upload image</p>
                    {/* {imageIsLoading && <Spin indicator={<LoadingOutlined spin />} size="large" />} */}
                    {/* {imageError ? <CloseCircleOutlined twoToneColor="#52c41a"/> : <CheckCircleOutlined twoToneColor="#52c41a"/>} */}
                    {/* <ProgressBar progress={imageProgress ?? 0} /> */}
                    <Progress strokeColor="#faad14" percent={imageProgress} size={[500, 25]} />
                    <p style={{ fontSize: '15px', color: 'yellow' }}>{imageError}</p>
                </div>
                <div>
                    <p className='lable'>Upload metadata</p>
                    {(jsonIsLoading && urlIsLoading) ? (
                        <ResultApp args='success' />
                    ) : (
                        <Spin indicator={<LoadingOutlined spin />} size="large" />
                    )}
                    <p style={{ fontSize: '15px', color: 'yellow' }}>
                        {jsonError}<br />{urlError}
                    </p>

                </div>

                {/* {(radio === 'Storing') &&
                        <div>
                            <p className='lable'>EncryptData</p>
                            {encryptIsLoading ? (
                                <ResultApp args='success' />
                            ) : (
                                <Spin indicator={<LoadingOutlined spin />} size="large" />
                            )}
                            <p style={{ fontSize: '15px', color: 'yellow' }}>{encryptError}</p>
                        </div>
                    } */}
                <div>
                    <p className='lable'>Mint NFT</p>
                    {mintIsLoading ? (
                        <ResultApp args='success' />
                    ) : (
                        <Spin indicator={<LoadingOutlined spin />} size="large" />
                    )}
                    <p style={{ fontSize: '15px', color: 'yellow' }}>{mintError}</p>
                </div>
                <div className='line'></div>
                <div>
                    <p>Please wait to signature verification on wallet.</p>
                </div>
                <div className='line'></div>
            </div>
        </Modal>


    );
}

export default ModalDialogProgress;