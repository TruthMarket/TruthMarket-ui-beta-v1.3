import { ContractFunctionParams } from './provider';

export function useProviderFundManager(contract: (params: ContractFunctionParams) => Promise<any>) {
    // 基本信息查询
    // const Admin = async (): Promise<string> => {
    //     try {
    //         const tx = await contract({
    //             functionName: "Admin",
    //             methodType: "read_fundManager",
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
    //             methodType: "read_fundManager",
    //         });
    //         return tx || '';
    //     } catch (error) {
    //         console.error("Implementation error:", error);
    //         return '';
    //     }
    // };

    // 费率查询
    const adminFeeRate = async (tokenId: number): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "adminFeeRate",
                methodType: "read_fundManager",
                args: [tokenId],
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("adminFeeRate error:", error);
            return 0;
        }
    };

    const buyerFeeRate = async (tokenId: number): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "buyerFeeRate",
                methodType: "read_fundManager",
                args: [tokenId],
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("buyerFeeRate error:", error);
            return 0;
        }
    };

    const bidIncrementRate = async (): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "bidIncrementRate",
                methodType: "read_fundManager",
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("bidIncrementRate error:", error);
            return 0;
        }
    };

    const completerRewardRate = async (): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "completerRewardRate",
                methodType: "read_fundManager",
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("completerRewardRate error:", error);
            return 0;
        }
    };

    const publicRewardRate = async (): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "publicRewardRate",
                methodType: "read_fundManager",
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("publicRewardRate error:", error);
            return 0;
        }
    };

    const serviceFeeRate = async (): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "serviceFeeRate",
                methodType: "read_fundManager",
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("serviceFeeRate error:", error);
            return 0;
        }
    };

    // 金额查询
    const orderAmount = async (tokenId: number, addr: string): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "orderAmount",
                methodType: "read_fundManager",
                args: [tokenId, addr],
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("orderAmount error:", error);
            return 0;
        }
    };

    const otherRewards = async (tokenId: number, addr: string): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "otherRewards",
                methodType: "read_fundManager",
                args: [tokenId, addr],
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("otherRewards error:", error);
            return 0;
        }
    };

    const minterRewards = async (tokenId: number): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "minterRewards",
                methodType: "read_fundManager",
                args: [tokenId],
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("minterRewards error:", error);
            return 0;
        }
    };

    const publicRewards = async (tokenId: number): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "publicRewards",
                methodType: "read_fundManager",
                args: [tokenId],
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("publicRewards error:", error);
            return 0;
        }
    };

    // 资金池查询
    const allocatedFunds = async (): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "allocatedFunds",
                methodType: "read_fundManager",
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("allocatedFunds error:", error);
            return 0;
        }
    };

    const unallocatedFunds = async (): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "unallocatedFunds",
                methodType: "read_fundManager",
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("unallocatedFunds error:", error);
            return 0;
        }
    };

    const totalRewards = async (tokenId: number): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "totalRewards",
                methodType: "read_fundManager",
                args: [tokenId],
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("totalRewards error:", error);
            return 0;
        }
    };

    // 状态查询
    const refundPermit = async (tokenId: number): Promise<boolean> => {
        try {
            const tx = await contract({
                functionName: "refundPermit",
                methodType: "read_fundManager",
                args: [tokenId],
            });
            return tx || false;
        } catch (error) {
            console.error("refundPermit error:", error);
            return false;
        }
    };

    const isPauseWithdraw = async (): Promise<boolean> => {
        try {
            const tx = await contract({
                functionName: "isPauseWithdraw",
                methodType: "read_fundManager",
            });
            return tx || false;
        } catch (error) {
            console.error("isPauseWithdraw error:", error);
            return false;
        }
    };

    return {
        // 基本信息
        // Admin,
        // Implementation,
        // 费率查询
        adminFeeRate,
        buyerFeeRate,
        bidIncrementRate,
        completerRewardRate,
        publicRewardRate,
        serviceFeeRate,
        // 金额查询
        orderAmount,
        otherRewards,
        minterRewards,
        publicRewards,
        // 资金池查询
        allocatedFunds,
        unallocatedFunds,
        totalRewards,
        // 状态查询
        refundPermit,
        isPauseWithdraw,
    };
}
