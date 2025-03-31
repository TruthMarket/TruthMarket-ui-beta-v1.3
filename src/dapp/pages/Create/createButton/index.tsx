import { 
    useState,
    // useEffect,
} from 'react';
import styles from './styles.module.scss';
// import { useCreateFileContext } from '../../../provider/CreateFileProvider';
// import { useUploadContext } from '../../../provider/UploadProvider';
import { useSetTime } from '../workflow/setTime';
import { useFirstStep } from '../workflow/firstStep';
import { useSecondStep } from '../workflow/secondStep';
import { useProgressContext } from '../useState/progress';
import ModalDialogProgress from '../ModalDialog/progressModal';
import ModalDialogSave from '../ModalDialog/saveModal';
import { useDataCheck } from '../workflow/dataCheck';
import { useClearData } from '../workflow/clearData';
import { useMint } from '../workflow/mintNFT';
// import { nftForm_mint } from '../useState/nftForm';

export const CreateButton = () => {
    const [open, setOpen] = useState(false);
    const [save, setSave] = useState(false);
    const { clearAllData } = useClearData();

    const {mintProgress,updateMintProgress }= useProgressContext()||{};
    const isLoading = mintProgress?.isLoading;
    
    const dataCheck = useDataCheck();
    const executeSetTime = useSetTime();
    const executeFirstStep = useFirstStep();
    const executeSecondStep = useSecondStep();
    // const executeThirdStep = useThirdStep();
    const executeMint = useMint();
    
    const handleCreate = async () => {
        const checkResult = await dataCheck();
        if (!checkResult) {
            return; 
        }
        setOpen(true); 

        try {
            const jsonCopy = await executeSetTime();
            
            // 1. Compress file image and upload to IPFS
            const resultFirst = await executeFirstStep(jsonCopy);

            // 2. Create JSON url image and upload to IPFS
            await executeSecondStep(resultFirst);

            // let result:boolean = false;
            // if(radio === 'Storing') {
            //     // 3. Create a key pair
            //     result = await executeThirdStep(resultFirst);
            // } else if (radio === 'Public') {
            //     result = true;
            // }
            // 给状态更新一个缓冲时间
            await new Promise(resolve => setTimeout(resolve, 3000)); 

            // 4. Verify and Mint NFT
            await executeMint();
            
        } catch (error) {
            alert(`NFT mint failed: ${error}`);
        } finally{
            updateMintProgress?.('isLoading',false);
        }
    };

    const handleSaveClear = () => {
        clearAllData();
        setSave(false)
    };
    
    return (
        <>
            <button
                className={styles.button1}
                onClick={handleCreate}
                disabled={isLoading}
            >
                {isLoading ? 'Process...' : 'Create'}
            </button>
            {open && <ModalDialogProgress onClose={() => {setOpen(false), setSave(true)}}/>}
            {save && <ModalDialogSave onClose={handleSaveClear}/>}
        </>
    );
};