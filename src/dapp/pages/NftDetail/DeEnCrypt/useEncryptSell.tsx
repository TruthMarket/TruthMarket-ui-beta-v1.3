// import { 
//     useCallback
// } from 'react';
import { useSellFormContext } from "../useState/sellForm";

import { useCryptoUtils } from '../../../utils/crypto/crypto';
import { encryptionState } from "../../../useState/state_encryptionStorage";
// import { currentState } from '../../../useState/state_publicKeyCrypt';
// import { Base64ToEthereumBytes, EthereumBytesToBase64 } from '../../../utils/crypto/bytes_base64';

interface EncryptionData {
    publicKey_minter:string,
    fileCid_office:string,
    fileCid_iv_office:string,
    password_iv_office:string,
    password_office:string
}

export const useEncryptoSell = () => {
    const { updateSellForm } = useSellFormContext() || {};
    // const { updateMintProgress } = useProgressContext() || {};

    // const {generateKeyPair, encrypt} = CryptoKey();
    const { encryptData, decryptData, generateSharedKey, generateKeyPair } = useCryptoUtils();

    const encryptoSell = async (fileCID: string, password:string): Promise<EncryptionData|null> => {

        const publicKey_office = encryptionState.publicKey_office;

        try {
            // step 1
            const { publicKey_bytes, privateKey_bytes } = await generateKeyPair();

            updateSellForm?.('privateKey_minter', privateKey_bytes);
            updateSellForm?.('publicKey_minter', publicKey_bytes);
            const publicKey_minter= publicKey_bytes;
            // step2 sharedKey
            const sharedKey = await generateSharedKey(publicKey_office, privateKey_bytes)

            if (sharedKey && fileCID && password) {
                // encrypted
                const { iv_bytes: fileCid_iv_office, encrypted_bytes: fileCid_office } = await encryptData(fileCID, sharedKey);
                const { iv_bytes: password_iv_office, encrypted_bytes: password_office } = await encryptData(password, sharedKey);
                // decrypt
                const file_de = await decryptData(fileCid_iv_office, fileCid_office, sharedKey);
                const password_de = await decryptData(password_iv_office, password_office, sharedKey);

                if (fileCID === file_de && password_de === password) {
                    
                    // updateSellForm?.('fileCid_iv_office', fileCid_iv_office);
                    // updateSellForm?.('password_iv_office', password_iv_office);
                    // updateSellForm?.('fileCid_office', fileCid_office);
                    // updateSellForm?.('password_office', password_office);
                    
                    console.log ('Encryption, decryption, and verification have been successful!');
                    return {publicKey_minter,fileCid_office,fileCid_iv_office,password_iv_office,password_office};
                } else {
                    // console.log ('Encryption, decryption, and verification have been failed!')
                    return null;
                }

            } else {
                // console.error('Lack of necessary encrypted data!');
                return null;
            }

        } catch (error) {
            // console.error("Third step error:", error);
            return null;
        }
    };

    return encryptoSell;
}