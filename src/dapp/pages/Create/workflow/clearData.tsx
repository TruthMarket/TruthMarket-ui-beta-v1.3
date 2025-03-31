import { useFileImageContext, fileImageState } from '../useState/fileImage';
import { useBoxInfoContext, boxInfo } from '../useState/boxInfo';
import { useNftFormContext, nftForm_mint } from '../useState/nftForm';
import { useProgressContext, mintProgress_mint } from '../useState/progress';
import { useKeyCidPasswContext, filePassword_mint } from '../useState/keyCidPassword';

export const useClearData = () => {
    const { updateFileList, updateImage } = useFileImageContext() || {};
    const { updateBoxInfo } = useBoxInfoContext() || {};
    const { updateNftForm } = useNftFormContext() || {};
    const { updateMintProgress } = useProgressContext() || {};
    const { updateCidPasswState } = useKeyCidPasswContext() || {};

    const clearAllData = () => {
        // 清除 fileImage 数据
        updateFileList?.([]);
        updateImage?.([]);
        fileImageState.fileList = [];
        fileImageState.imageFile = [];

        // 清除 json 数据
        Object.keys(boxInfo).forEach((key) => {
            updateBoxInfo?.(key as keyof typeof boxInfo, null);
        });

        // 清除 nftForm 数据
        Object.keys(nftForm_mint).forEach((key) => {
            updateNftForm?.(key as keyof typeof nftForm_mint, '');
        });

        // 清除 progress 数据
        Object.keys(mintProgress_mint).forEach((key) => {
            if (typeof mintProgress_mint[key as keyof typeof mintProgress_mint] === 'boolean') {
                updateMintProgress?.(key as keyof typeof mintProgress_mint, false);
            } else if (typeof mintProgress_mint[key as keyof typeof mintProgress_mint] === 'number') {
                updateMintProgress?.(key as keyof typeof mintProgress_mint, 0);
            } else {
                updateMintProgress?.(key as keyof typeof mintProgress_mint, null);
            }
        });

        // 清除 keyCidPassworld 数据
        Object.keys(filePassword_mint).forEach((key) => {
            updateCidPasswState?.(key as keyof typeof filePassword_mint, null);
        });

        console.log('All data has been cleared');
    };

    return { clearAllData };
};


/*
import { useClearData } from './clearData';

const YourComponent = () => {
    const { clearAllData } = useClearData();

    const handleClear = () => {
        clearAllData();
    };

    return (
        <button onClick={handleClear}>
            Clear All Data
        </button>
    );
};
*/
