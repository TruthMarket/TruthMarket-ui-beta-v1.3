import { ContractFunctionParams } from './provider';

export function useProviderEncryption(contract: (params: ContractFunctionParams) => Promise<any>) {
    // 基本信息查询
    // const Admin = async (): Promise<string> => {
    //     try {
    //         const tx = await contract({
    //             functionName: "Admin",
    //             methodType: "read_encryption",
    //         });
    //         return tx || '';
    //     } catch (error) {
    //         console.error("Admin error:", error);
    //         return '';
    //     }
    // };

    // const Implementation = async (): Promise<string> => {
    //     try {
    //         const tx = await contract({
    //             functionName: "Implementation",
    //             methodType: "read_encryption",
    //         });
    //         return tx || '';
    //     } catch (error) {
    //         console.error("Implementation error:", error);
    //         return '';
    //     }
    // };

    // 密钥查询
    const PublicKey_minter = async (tokenId: number): Promise<string> => {
        try {
            const tx = await contract({
                functionName: "PublicKey_minter",
                methodType: "read_encryption",
                args: [tokenId],
            });
            return tx || '';
        } catch (error) {
            console.error("PublicKey_minter error:", error);
            return '';
        }
    };

    const PublicKey_office = async (index: number): Promise<string> => {
        try {
            const tx = await contract({
                functionName: "PublicKey_office",
                methodType: "read_encryption",
                args: [index],
            });
            return tx || '';
        } catch (error) {
            console.error("PublicKey_office error:", error);
            return '';
        }
    };

    const PublicKey_buyer = async (tokenId: number): Promise<string> => {
        try {
            const tx = await contract({
                functionName: "PublicKey_buyer",
                methodType: "read_encryption",
                args: [tokenId],
            });
            return tx || '';
        } catch (error) {
            console.error("PublicKey_buyer error:", error);
            return '';
        }
    };

    const PrivateKey_buyer = async (tokenId: number): Promise<string> => {
        try {
            const tx = await contract({
                functionName: "PrivateKey_buyer",
                methodType: "read_encryption",
                args: [tokenId],
            });
            return tx || '';
        } catch (error) {
            console.error("PrivateKey_buyer error:", error);
            return '';
        }
    };

    // 加密数据查询
    const getCryptData_office = async (tokenId: number) => {
        try {
            const tx = await contract({
                functionName: "getCryptData_office",
                methodType: "read_encryption",
                args: [tokenId],
            });
            if (Array.isArray(tx) && tx.length === 4) {
                const [fileCid_iv_crypt, fileCid_crypt, password_iv_crypt,  password_crypt] = tx.map(item => item.toString());
                return {
                    fileCid_iv_crypt,
                    fileCid_crypt,
                    password_iv_crypt,
                    password_crypt
                };
            }
            return null;
        } catch (error) {
            console.error("getCryptData_office error:", error);
            return null;
        }
    };

    const getCryptData_buyer = async (tokenId: number) => {
        try {
            const tx = await contract({
                functionName: "getCryptData_buyer",
                methodType: "read_encryption",
                args: [tokenId],
            });
            if (Array.isArray(tx) && tx.length === 4) {
                const [fileCid_iv_crypt,fileCid_crypt,  password_iv_crypt, password_crypt] = tx.map(item => item.toString());
                return {
                    fileCid_iv_crypt,
                    fileCid_crypt,
                    password_iv_crypt,
                    password_crypt
                };
            }
            return null;
        } catch (error) {
            console.error("getCryptData_buyer error:", error);
            return null;
        }
    };

    // 计数器查询
    const officeKeyCounts = async (): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "officeKeyCounts",
                methodType: "read_encryption",
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("officeKeyCounts error:", error);
            return 0;
        }
    };

    return {
        // 基本信息
        // Admin,
        // Implementation,
        // 密钥查询
        PublicKey_minter,
        PublicKey_office,
        PublicKey_buyer,
        PrivateKey_buyer,
        // 加密数据查询
        getCryptData_office,
        getCryptData_buyer,
        // 计数器查询
        officeKeyCounts,
    };
}
