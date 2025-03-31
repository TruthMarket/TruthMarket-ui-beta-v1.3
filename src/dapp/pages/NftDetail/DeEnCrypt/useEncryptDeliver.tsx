import {
    // useState,
    useContext,
} from "react"
import { useCryptoUtils } from "../../../utils/crypto/crypto";
// import { Base64ToEthereumBytes, EthereumBytesToBase64 } from "../../../utils/crypto/bytes_base64";
// import { usePublicKey_office } from "../../../useReadWrite/publicKeyCrypt/usePublicKeyOffice";
import { ContractContext } from "../../../context";
import { useRoleContext } from "../useState/roleContext/RoleContext";

export type userRoleType = 'admin' | 'minter';
// 定义返回类型
export type DeEnCryptoResult = {
    fileCid_iv_buyer: string;
    fileCid_buyer: string;
    password_iv_buyer: string;
    password_buyer: string;
};
// 这里要区分情况，如果是minter发货，或者是office发货。主要是依据adminfeeRate的值来进行判断。
export const useEnCryptDeliver = () => {
    const {
        PublicKey_minter,
        PublicKey_office,
        // PublicKey_buyer,
        getCryptData_office,
    } = useContext(ContractContext);
    const { userRole } = useRoleContext() || {}
    // const { getPublicKey_office } = usePublicKey_office();
    const { encryptData, decryptData, generateSharedKey, } = useCryptoUtils();

    const enCryptDeliver = async (
        tokenId: number,
        publicKey_buyer: string,
        // publicKey_minter: string,
        privateKey_user: string,
    ): Promise<DeEnCryptoResult | null> => {

        if (privateKey_user === '') {
            alert('privateKey is empty!')
            return null;
        }
        if (userRole === null) {
            alert('userRole is empty!')
            return null;
        }
        if (publicKey_buyer === '') {
            alert('publicKey_buyer is empty!')
            return null;
        }
        if (tokenId === null) {
            alert('tokenId is empty!')
            return null;
        }

        let publicKey: string;
        try {
            if (userRole === 'minter') {
                publicKey = await PublicKey_office(1); // need change
            } else if (userRole === 'admin') {
                publicKey = await PublicKey_minter(tokenId);
            } else {
                throw new Error('Invalid userRole');
            }
            console.log('publicKey_deliver:', publicKey);
            if (!publicKey) {
                throw new Error('Failed to fetch public key');
            }
        } catch (error) {
            console.error('Error fetching public key:', error);
            alert(error instanceof Error ? error.message : 'Failed to get public key');
            return null;
        }

        const {
            fileCid_iv_crypt,
            fileCid_crypt,
            password_iv_crypt,
            password_crypt
        } = await getCryptData_office(tokenId);

        try {
            let fileCid = ''
            let password = ''
            if (fileCid_iv_crypt && fileCid_crypt && password_crypt && password_iv_crypt) {

                // step1 使用office公钥或minter公钥，配合当前用户（minter/admin）的私钥，解密出原始的数据
                const sharedKey_mint = await generateSharedKey(publicKey, privateKey_user)
                console.log('sharedKey_mint:', sharedKey_mint);
                fileCid = await decryptData(fileCid_iv_crypt, fileCid_crypt, sharedKey_mint);
                password = await decryptData(password_iv_crypt, password_crypt, sharedKey_mint);
                console.log('fileCid:', fileCid);
                console.log('password:', password);

            } else {
                console.error('decryption failed!')
                return null;
            }
            // step 2
            // 使用buyer公钥和用户私钥生成 sharedKey_buyer
            const sharedKey_buyer = await generateSharedKey(publicKey_buyer, privateKey_user)
            console.log('sharedKey_buyer:', sharedKey_buyer);
            if (sharedKey_buyer && fileCid && password) {
                // 使用sharedKey_buyer加密数据
                const { iv_bytes: fileCid_iv_buyer, encrypted_bytes: fileCid_buyer } = await encryptData(fileCid, sharedKey_buyer);
                const { iv_bytes: password_iv_buyer, encrypted_bytes: password_buyer } = await encryptData(password, sharedKey_buyer);
                console.log('sharedKey_buyer encrytion successful!');
                // decrypt
                const fileCid_de = await decryptData(fileCid_iv_buyer, fileCid_buyer, sharedKey_buyer);
                const password_de = await decryptData(password_iv_buyer, password_buyer, sharedKey_buyer);

                if (fileCid === fileCid_de && password_de === password) {
                    // console.log ('Encryption, decryption, and verification successful!')
                    return { fileCid_iv_buyer, password_iv_buyer, fileCid_buyer, password_buyer };
                } else {
                    console.error('Encryption, decryption, and verification failed!')
                    return null;
                }
            }
        } catch (error) {
            console.error('useEnCryptDeliver is error:', error);
        }
        return null;
    }

    return enCryptDeliver;
}