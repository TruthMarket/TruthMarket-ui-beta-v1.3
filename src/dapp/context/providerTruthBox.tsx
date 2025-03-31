import { ContractFunctionParams } from './provider';
import { boxInfoHanding } from "../hooks/boxInfoHandling";

export function useProviderTruthBox(contract: (params: ContractFunctionParams) => Promise<any>) {
    // 基本信息查询
    const name = async (): Promise<string> => {
        try {
            const tx = await contract({
                functionName: "name",
                methodType: "read_truthBox",
            });
            return tx || '';
        } catch (error) {
            console.error("name error:", error);
            return '';
        }
    };

    const symbol = async (): Promise<string> => {
        try {
            const tx = await contract({
                functionName: "symbol",
                methodType: "read_truthBox",
            });
            return tx || '';
        } catch (error) {
            console.error("symbol error:", error);
            return '';
        }
    };

    const logoURI = async (): Promise<string> => {
        try {
            const tx = await contract({
                functionName: "logoURI",
                methodType: "read_truthBox",
            });
            return tx || '';
        } catch (error) {
            console.error("logoURI error:", error);
            return '';
        }
    };

    // 合约地址查询
    // const Admin = async (): Promise<string> => {
    //     try {
    //         const tx = await contract({
    //             functionName: "Admin",
    //             methodType: "read_truthBox",
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
    //             methodType: "read_truthBox",
    //         });
    //         return tx || '';
    //     } catch (error) {
    //         console.error("Implementation error:", error);
    //         return '';
    //     }
    // };

    // NFT 信息查询
    const getBoxInfo = async (tokenId: number) => {
        try {
            const tx = await contract({
                functionName: "getBoxInfo",
                methodType: "read_truthBox",
                args: [tokenId],
            });
            // 添加数据验证
            if (!tx || !Array.isArray(tx)) {
                console.error("Invalid response from contract:", tx);
                return null;
            }
            // console.log("getBoxInfo:",tx)
            return boxInfoHanding(tx, tokenId);
        } catch (error) {
            console.error("getBoxInfo error:", error);
            return null;
        }
    };

    const getStatus = async (tokenId: number) => {
        try {
            const tx = await contract({
                functionName: "getStatus",
                methodType: "read_truthBox",
                args: [tokenId],
            });
            return tx;
        } catch (error) {
            console.error("getStatus error:", error);
            return null;
        }
    };

    const getDeadline = async (tokenId: number): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "getDeadline",
                methodType: "read_truthBox",
                args: [tokenId],
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("getDeadline error:", error);
            return 0;
        }
    };

    const getPrice = async (tokenId: number): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "getPrice",
                methodType: "read_truthBox",
                args: [tokenId],
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("getPrice error:", error);
            return 0;
        }
    };

    // 所有权相关查询
    const ownerOf = async (tokenId: number): Promise<string> => {
        try {
            const tx = await contract({
                functionName: "ownerOf",
                methodType: "read_truthBox",
                args: [tokenId],
            });
            return tx || '';
        } catch (error) {
            console.error("ownerOf error:", error);
            return '';
        }
    };

    const minterOf = async (tokenId: number): Promise<string> => {
        try {
            const tx = await contract({
                functionName: "minterOf",
                methodType: "read_truthBox",
                args: [tokenId],
            });
            return tx || '';
        } catch (error) {
            console.error("minterOf error:", error);
            return '';
        }
    };

    const balanceOf = async (address: string): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "balanceOf",
                methodType: "read_truthBox",
                args: [address],
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("balanceOf error:", error);
            return 0;
        }
    };

    // 统计相关查询
    const totalSupply = async (): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "totalSupply",
                methodType: "read_truthBox",
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("totalSupply error:", error);
            return 0;
        }
    };

    const blackSupply = async (): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "blackSupply",
                methodType: "read_truthBox",
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("blackSupply error:", error);
            return 0;
        }
    };

    // 状态查询
    const isBlackTokenId = async (tokenId: number): Promise<boolean> => {
        try {
            const tx = await contract({
                functionName: "isBlackTokenId",
                methodType: "read_truthBox",
                args: [tokenId],
            });
            return tx || false;
        } catch (error) {
            console.error("isBlackTokenId error:", error);
            return false;
        }
    };

    const supportsInterface = async (interfaceId: string): Promise<boolean> => {
        try {
            const tx = await contract({
                functionName: "supportsInterface",
                methodType: "read_truthBox",
                args: [interfaceId],
            });
            return tx || false;
        } catch (error) {
            console.error("supportsInterface error:", error);
            return false;
        }
    };

    return {
        // 基本信息
        name,
        symbol,
        logoURI,
        // 合约地址
        // Admin,
        // Implementation,
        // NFT信息
        getBoxInfo,
        getStatus,
        getDeadline,
        getPrice,
        // 所有权相关
        ownerOf,
        minterOf,
        balanceOf,
        // 统计相关
        totalSupply,
        blackSupply,
        // 状态查询
        isBlackTokenId,
        supportsInterface,
    };
}
