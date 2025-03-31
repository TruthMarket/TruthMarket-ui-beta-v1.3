import { nftForm_mint } from "../useState/nftForm";
import { boxInfo } from "../useState/boxInfo";
import { fileImageState } from "../useState/fileImage";
// import { useJsonContext } from "../useState/json";
// import { useWalletContext } from "../../../context/useAccount/WalletContext";
// import { currentState } from "../../../useState/state_publicKeyCrypt";

export const useDataCheck = () => {
    const dataCheck = async () => {
        // const price = nftForm_mint.price;
        const type = boxInfo.typeOfCrime;
        const radio = nftForm_mint.radio;
        const title = boxInfo.title;
        const minter = boxInfo.minter;
        const introduce = boxInfo.description;
        const country = boxInfo.country;
        const { fileList, imageFile } = fileImageState;
        const missingFields = [];

        if (!type) missingFields.push('Type');
        if (!title) missingFields.push('Title');
        if (!minter) missingFields.push('MinterAddress');
        if (!country) missingFields.push('Country');
        if (!introduce) missingFields.push('Description');
        if (!radio) missingFields.push('Radio');
        // if (radio === 'Storing') {
        //     if (!price) missingFields.push('Price');
        // }
        if (!fileList || fileList.length === 0) missingFields.push('File');
        if (!imageFile || imageFile.length === 0) missingFields.push('Image');

        if (missingFields.length > 0) {
            const message = `The following data is missing: ${missingFields.join(', ')}`;
            alert(message);
            return false;
        }

        return true;
    };

    return dataCheck;

}

