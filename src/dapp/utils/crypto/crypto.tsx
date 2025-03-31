import { Base64ToEthereumBytes, EthereumBytesToBase64 } from "./bytes_base64";

interface KeyType { 
    privateKey_bytes: string;
    publicKey_bytes :string;
}

interface EncryptType { 
    iv_bytes : string;
    encrypted_bytes :string;
}

export const useCryptoUtils = () => {


    const cryptoKeyToBase64 = async (cryptoKey: CryptoKey): Promise<string> => {
        const rawKey = await window.crypto.subtle.exportKey('raw', cryptoKey);
        const binaryString = String.fromCharCode(...new Uint8Array(rawKey));
        return btoa(binaryString);
    };

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
    const cryptoKeyToBase64_ECDH = async (cryptoKey: CryptoKey, isPublic: boolean): Promise<string> => {
        // Choose the correct export format based on whether it's a public or private key
        const format = isPublic ? 'spki' : 'pkcs8';
        const rawKey = await window.crypto.subtle.exportKey(format, cryptoKey);
        return arrayBufferToBase64(rawKey);
    };
    
    const base64ToCryptoKey_ECDH = async (
        base64Str: string,
        isPublic: boolean
    ): Promise<CryptoKey> => {
        const keyData = base64ToArrayBuffer(base64Str);
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
                namedCurve: 'P-256', 
            },
            true, // Whether the key is exportable
            ['deriveKey'] // Use for
        );

        const privateKey_base64 = await cryptoKeyToBase64_ECDH(privateKey,false);
        const publicKey_base64 = await cryptoKeyToBase64_ECDH(publicKey,true);

        // // --------------base64 to bytes -------------
        const privateKey_bytes = Base64ToEthereumBytes(privateKey_base64);
        const publicKey_bytes = Base64ToEthereumBytes(publicKey_base64);
        console.log('publicKey：', publicKey_bytes);
        console.log('privateKey：', privateKey_bytes);

        return { privateKey_bytes, publicKey_bytes };
    };

    const generateSharedKey = async(publicKey_bytes: string, privateKey_bytes: string):Promise<string> => {
        const public_Key = EthereumBytesToBase64(publicKey_bytes)
        const private_Key = EthereumBytesToBase64(privateKey_bytes)
        
        const publicKey = await base64ToCryptoKey_ECDH(public_Key,true)
        const privateKey = await base64ToCryptoKey_ECDH(private_Key,false)

        // Generate a shared key using one's own private key and the other party's public key
        const sharedKey = await window.crypto.subtle.deriveKey(
            {
                name: 'ECDH',
                public: publicKey as CryptoKey,
            },
            privateKey as CryptoKey,
            { name: 'AES-GCM', length: 256 }, // Key for AES
            true, 
            ['encrypt', 'decrypt'] 
        );

        const key_base64 = await cryptoKeyToBase64(sharedKey);
        // --------------64 to bytes--------------
        const key_bytes = Base64ToEthereumBytes(key_base64)
        console.log('shareKey_bytes：', key_bytes);
        return key_bytes;
    }

    // Encrypt the data using the public key
    const encryptData = async (data: string, shareKey_bytes: string):Promise<EncryptType> => {
        // --------------bytes to 64 -------------
        const Key = EthereumBytesToBase64(shareKey_bytes);

        // Generate a shared key using one's own private key and the other party's public key
        // const Key = await generateSharedKey(public_Key, private_Key)
        const sharedKey = await base64ToCryptoKey(Key)

        // Generate random IV
        const iv_uint8 = window.crypto.getRandomValues(new Uint8Array(12));

        // Encrypt data using a shared key
        const encodedData = new TextEncoder().encode(data);
        const encryptedData_array = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv_uint8, // Use randomly generated IV
            },
            sharedKey, // AES key used for decrypting data
            encodedData
        );

        // Convert data to a Base64 string to store the correct content
        const iv_base64 = arrayBufferToBase64(iv_uint8.buffer);
        const encrypted_base64 = arrayBufferToBase64(encryptedData_array)

        // --------------64 to bytes--------------
        const iv_bytes = Base64ToEthereumBytes(iv_base64)
        const encrypted_bytes = Base64ToEthereumBytes(encrypted_base64)

        console.log('iv_bytes：', iv_bytes);
        console.log('encrypted_bytes：', encrypted_bytes);
        return {iv_bytes, encrypted_bytes};
    };

    // Decrypt the data using the private key
    const decryptData = async (iv_base64:string, encrypted_bytes: string, shareKey_bytes:string) => {
        // --------------bytes to 64 -------------
        const iv = EthereumBytesToBase64(iv_base64);
        const encrypted = EthereumBytesToBase64(encrypted_bytes);
        const shareKey = EthereumBytesToBase64(shareKey_bytes);

        const ivArray = base64ToArrayBuffer(iv);
        const encryptedArray = base64ToArrayBuffer(encrypted);
        // const exportedKeyArray = base64ToArrayBuffer(encryptedKey);

        const key = await base64ToCryptoKey(shareKey ??'');

        if (key) {
            const decryptedData = await window.crypto.subtle.decrypt(
                {
                    name: 'AES-GCM',
                    iv: ivArray,
                },
                key, // AES key used for decrypting data
                encryptedArray
            );

            const decodedData = new TextDecoder().decode(decryptedData);
            console.log('decodedData：', decodedData);
            return decodedData;
        } else {
            console.error('shareKey is null');
            return 'shareKey is null';
        }
    };

    return {encryptData, decryptData, generateSharedKey, generateKeyPair}

}