import { Base64ToEthereumBytes, EthereumBytesToBase64 } from "./bytes_base64";

interface KeyType {
    privateKey_bytes: string;
    publicKey_bytes: string;
}

export const useCryptoUtils = () => {


    // const cryptoKeyToBase64 = async (cryptoKey: CryptoKey): Promise<string> => {
    //     const rawKey = await window.crypto.subtle.exportKey('raw', cryptoKey);
    //     const binaryString = String.fromCharCode(...new Uint8Array(rawKey));
    //     return btoa(binaryString);
    // };

    const base64ToCryptoKey = async (
        base64Str: string,
        algorithm: { name: 'AES-GCM' } = { name: 'AES-GCM' }
    ): Promise<CryptoKey> => {
        const binaryString = atob(base64Str);
        const rawKey = new Uint8Array(binaryString.length);

        for (let i = 0; i < binaryString.length; i++) {
            rawKey[i] = binaryString.charCodeAt(i);
        }

        return await window.crypto.subtle.importKey('raw', rawKey, algorithm, true, ['encrypt', 'decrypt']);
    };

    // =================================================================

    // Convert ArrayBuffer to Base64
    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    // Convert Base64 to ArrayBuffer
    const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    };

    // ==================================================================
    // const cryptoKeyToBase64_ECDH = async (cryptoKey: CryptoKey, isPublic: boolean): Promise<string> => {
    //     // 根据是公钥还是私钥选择正确的导出格式
    //     const format = isPublic ? 'spki' : 'pkcs8';
    //     const rawKey = await window.crypto.subtle.exportKey(format, cryptoKey);
    //     return arrayBufferToBase64(rawKey);
    // };

    // const base64ToCryptoKey_ECDH = async (
    //     base64Str: string,
    //     isPublic: boolean
    // ): Promise<CryptoKey> => {
    //     const keyData = base64ToArrayBuffer(base64Str);
    //     const format = isPublic ? 'spki' : 'pkcs8';
    //     const algorithm = { name: 'ECDH', namedCurve: 'P-256' };
    //     const extractable = true;
    //     const keyUsages = isPublic ? [] : ['deriveKey'];

    //     return await window.crypto.subtle.importKey(
    //         format,
    //         keyData,
    //         algorithm,
    //         extractable,
    //         keyUsages as KeyUsage[]
    //     );
    // };


    // ==================================================================
    // ==================================================================
    const cryptoKeyToEthereumBytes = async (cryptoKey: CryptoKey, isPublic: boolean): Promise<string> => {
        const format = isPublic ? 'spki' : 'pkcs8';
        const rawKey = await window.crypto.subtle.exportKey(format, cryptoKey);
        // 直接将 ArrayBuffer 转换为 16 进制字符串
        const hexString = Array.from(new Uint8Array(rawKey), byte =>
            byte.toString(16).padStart(2, '0')
        ).join('');
        return "0x" + hexString;
    };

    const ethereumBytesToCryptoKey = async (
        ethereumBytes: string,
        isPublic: boolean
    ): Promise<CryptoKey> => {
        // 移除 0x 前缀
        const hexString = ethereumBytes.slice(2);
        // 转换回 ArrayBuffer
        const keyData = new Uint8Array(
            hexString.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
        ).buffer;

        const format = isPublic ? 'spki' : 'pkcs8';
        const algorithm = { name: 'ECDH', namedCurve: 'P-256' };
        const extractable = true;
        const keyUsages = isPublic ? [] : ['deriveKey'];

        return await window.crypto.subtle.importKey(
            format,
            keyData,
            algorithm,
            extractable,
            keyUsages as KeyUsage[]
        );
    };



    // ==================================================================
    // ==================================================================

    // Generate a key pair for ECDH
    const generateKeyPair = async (): Promise<KeyType> => {
        const { publicKey, privateKey } = await window.crypto.subtle.generateKey(
            {
                name: 'ECDH',
                namedCurve: 'P-256', // 使用椭圆曲线 P-256
            },
            true, // 是否可以导出密钥
            ['deriveKey'] // 使用目的
        );

        // 直接转换为 EthereumBytes
        const privateKey_bytes = await cryptoKeyToEthereumBytes(privateKey, false);
        const publicKey_bytes = await cryptoKeyToEthereumBytes(publicKey, true);

        return { privateKey_bytes, publicKey_bytes };
    };

    const generateSharedKey = async (publicKey_bytes: string, privateKey_bytes: string): Promise<string> => {

        const publicKey = await ethereumBytesToCryptoKey(publicKey_bytes, true)
        const privateKey = await ethereumBytesToCryptoKey(privateKey_bytes, false)

        // 使用自己的私钥与对方的公钥生成共享密钥
        const sharedKey = await window.crypto.subtle.deriveKey(
            {
                name: 'ECDH',
                public: publicKey as CryptoKey,
            },
            privateKey as CryptoKey,
            { name: 'AES-GCM', length: 256 }, // 用于 AES 的密钥
            true,
            ['encrypt', 'decrypt']
        );

        const key_bytes = await cryptoKeyToEthereumBytes(sharedKey,false);
        return key_bytes;
    }

    // Encrypt the data using the public key
    const encryptData = async (data: string, Key_bytes: string) => {
        // --------------bytes to 64 -------------
        const Key = EthereumBytesToBase64(Key_bytes);

        // 使用自己的私钥与对方的公钥生成共享密钥
        // const Key = await generateSharedKey(public_Key, private_Key)
        const sharedKey = await base64ToCryptoKey(Key)

        // 生成随机IV
        const iv_uint8 = window.crypto.getRandomValues(new Uint8Array(12));

        // 使用共享密钥加密数据
        const encodedData = new TextEncoder().encode(data);
        const encryptedData_array = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv_uint8, // 使用随机生成的 IV
            },
            sharedKey, // 用于加密数据的 AES 密钥
            encodedData
        );

        // 将数据转换为 Base64 字符串以便存储正确的内容
        const iv_base64 = arrayBufferToBase64(iv_uint8);
        const encrypted_base64 = arrayBufferToBase64(encryptedData_array)

        // --------------64 to bytes--------------
        const iv_bytes = Base64ToEthereumBytes(iv_base64)
        const encrypted_bytes = Base64ToEthereumBytes(encrypted_base64)
        return { iv_bytes, encrypted_bytes };
    };

    // Decrypt the data using the private key
    const decryptData = async (iv_base64: string, encrypted_bytes: string, shareKey_bytes: string) => {
        // --------------bytes to 64 -------------
        const iv = EthereumBytesToBase64(iv_base64);
        const encrypted = EthereumBytesToBase64(encrypted_bytes);
        const shareKey = EthereumBytesToBase64(shareKey_bytes);

        const ivArray = base64ToArrayBuffer(iv);
        const encryptedArray = base64ToArrayBuffer(encrypted);
        // const exportedKeyArray = base64ToArrayBuffer(encryptedKey);

        const key = await base64ToCryptoKey(shareKey ?? '');

        // 使用 AES 密钥解密数据
        if (key) {
            const decryptedData = await window.crypto.subtle.decrypt(
                {
                    name: 'AES-GCM',
                    iv: ivArray,
                },
                key, // 用于解密数据的 AES 密钥
                encryptedArray
            );

            // 解码并恢复原始数据
            const decodedData = new TextDecoder().decode(decryptedData);
            return decodedData;
        } else {
            console.error('shareKey is null');
            return 'shareKey is null';
        }
    };

    return { encryptData, decryptData, generateSharedKey, generateKeyPair }

}