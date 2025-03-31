import {
    // useState,
    useContext,
} from "react"
import { useCryptoUtils } from "../../../utils/crypto/crypto";
// import { Base64ToEthereumBytes, EthereumBytesToBase64 } from "../../../utils/crypto/bytes_base64";
import { ContractContext } from "../../../context";
import { useRoleContext } from "../useState/roleContext/RoleContext";
// import { usePublicKey_office } from "../../../useReadWrite/publicKeyCrypt/usePublicKeyOffice";

export type userRoleType = 'admin' | 'minter' | 'buyer';

export const useDecrypt = () => {
    const {
        PublicKey_minter,
        PublicKey_office,
        getCryptData_office,
        getCryptData_buyer,
        adminFeeRate,
    } = useContext(ContractContext);
    const { userRole } = useRoleContext() || {}
    // const { getPublicKey_office } = usePublicKey_office();
    const { decryptData, generateSharedKey, } = useCryptoUtils();

    // 定义异步函数
    const decrypt = async (
        tokenId: number,
        // publicKey_office: string,
        // publicKey_minter: string,
        privateKey_user: string,
    ) => {

        if (privateKey_user === '') {
            alert('privateKey is empty!')
            return null;
        }
        if (userRole === null) {
            alert('userRole is empty!')
            return null;
        }
        if ( tokenId === null) {
            alert('tokenId is empty!')
            return null;
        }

        const adminFee = await adminFeeRate(tokenId);
        
        let publicKey: string;
        let cryptData = {
            fileCidCrypt_iv: '',
            fileCidCrypt: '',
            passwordCrypt_iv: '',
            passwordCrypt: ''
        };
        
        try {
            if (userRole === 'minter') {
                publicKey = await PublicKey_office(1); // current key index is 1;
            } else if (userRole === 'admin') {
                publicKey = await PublicKey_minter(tokenId);
            } else if (userRole === 'buyer') {
                // check deliver is admin or minter
                if (adminFee) {
                    publicKey = await PublicKey_office(1);
                } else {
                    publicKey = await PublicKey_minter(tokenId);
                }
            } else {
                throw new Error('Invalid userRole');
            }

            if (!publicKey) {
                throw new Error('Failed to fetch public key');
            }
        } catch (error) {
            console.error('Error fetching public key:', error);
            alert(error instanceof Error ? error.message : 'Failed to get public key');
            return null;
        }

        try {
            if (userRole === 'minter' || userRole === 'admin') {
                const {
                    fileCid_iv_crypt,
                    password_iv_crypt,
                    fileCid_crypt,
                    password_crypt
                } = await getCryptData_office(tokenId);

                cryptData = {
                    fileCidCrypt_iv: fileCid_iv_crypt,
                    fileCidCrypt: fileCid_crypt,
                    passwordCrypt_iv: password_iv_crypt,
                    passwordCrypt: password_crypt
                };
            } else if (userRole === 'buyer') {
                const {
                    fileCid_iv_crypt,
                    password_iv_crypt,
                    fileCid_crypt,
                    password_crypt
                } = await getCryptData_buyer(tokenId);

                cryptData = {
                    fileCidCrypt_iv: fileCid_iv_crypt,
                    fileCidCrypt: fileCid_crypt,
                    passwordCrypt_iv: password_iv_crypt,
                    passwordCrypt: password_crypt
                };

                if (!cryptData) {
                    throw new Error('Failed to fetch cryptData');
                }
            }
        } catch (error) {
            console.error('Error fetching cryptData:', error);
            alert(error instanceof Error ? error.message : 'Failed to get cryptData');
            return null;
        }

        const { fileCidCrypt_iv, fileCidCrypt, passwordCrypt_iv, passwordCrypt } = cryptData;
        console.log ('cryptData:',cryptData)
        try {
            if (fileCidCrypt_iv && fileCidCrypt && passwordCrypt && passwordCrypt_iv) {

                // step1 使用office公钥和minter的私钥，解密出原始的数据
                const sharedKey_one = await generateSharedKey(publicKey, privateKey_user)
                console.log('sharedKey_one:', sharedKey_one);
                const fileCid = await decryptData(fileCidCrypt_iv, fileCidCrypt, sharedKey_one);
                const password = await decryptData(passwordCrypt_iv, passwordCrypt, sharedKey_one);
                console.log('fileCid:', fileCid);
                console.log('password:', password);

                if (fileCid && password) {

                    // console.log ('Encryption, decryption, and verification have been successful!')
                    return { fileCid, password };
                }
            }
        } catch (error) {
            console.error('decryptSee error!', error);
        }
    }

    return decrypt;
}