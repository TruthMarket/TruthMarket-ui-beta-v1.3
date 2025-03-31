import { ContractFunctionParams } from './provider';

export function useProviderExchange(contract: (params: ContractFunctionParams) => Promise<any>) {
    // 基本信息查询
    // const Admin = async (): Promise<string> => {
    //     try {
    //         const tx = await contract({
    //             functionName: "Admin",
    //             methodType: "read_exchange",
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
    //             methodType: "read_exchange",
    //         });
    //         return tx || '';
    //     } catch (error) {
    //         console.error("Implementation error:", error);
    //         return '';
    //     }
    // };

    // 角色查询
    const buyerOf = async (tokenId: number): Promise<string> => {
        try {
            const tx = await contract({
                functionName: "buyerOf",
                methodType: "read_exchange",
                args: [tokenId],
            });
            return tx || '';
        } catch (error) {
            console.error("buyerOf error:", error);
            return '';
        }
    };

    const completerOf = async (tokenId: number): Promise<string> => {
        try {
            const tx = await contract({
                functionName: "completerOf",
                methodType: "read_exchange",
                args: [tokenId],
            });
            return tx || '';
        } catch (error) {
            console.error("completerOf error:", error);
            return '';
        }
    };

    // 时间周期查询
    const deliveryPeriod = async (): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "deliveryPeriod",
                methodType: "read_exchange",
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("deliveryPeriod error:", error);
            return 0;
        }
    };

    const refundRequestPeriod = async (): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "refundRequestPeriod",
                methodType: "read_exchange",
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("refundRequestPeriod error:", error);
            return 0;
        }
    };

    const refundReviewPeriod = async (): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "refundReviewPeriod",
                methodType: "read_exchange",
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("refundReviewPeriod error:", error);
            return 0;
        }
    };

    // 时间戳查询
    const deliveryTimestamp = async (tokenId: number): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "deliveryTimestamp",
                methodType: "read_exchange",
                args: [tokenId],
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("deliveryTimestamp error:", error);
            return 0;
        }
    };

    const purchaseTimestamp = async (tokenId: number): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "purchaseTimestamp",
                methodType: "read_exchange",
                args: [tokenId],
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("purchaseTimestamp error:", error);
            return 0;
        }
    };

    const refundRequestTimestamp = async (tokenId: number): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "refundRequestTimestamp",
                methodType: "read_exchange",
                args: [tokenId],
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("refundRequestTimestamp error:", error);
            return 0;
        }
    };

    // 状态查询
    const inRefundDeadline = async (tokenId: number): Promise<boolean> => {
        try {
            const tx = await contract({
                functionName: "inRefundDeadline",
                methodType: "read_exchange",
                args: [tokenId],
            });
            return tx || false;
        } catch (error) {
            console.error("inRefundDeadline error:", error);
            return false;
        }
    };

    const inReviewDeadline = async (tokenId: number): Promise<boolean> => {
        try {
            const tx = await contract({
                functionName: "inReviewDeadline",
                methodType: "read_exchange",
                args: [tokenId],
            });
            return tx || false;
        } catch (error) {
            console.error("inReviewDeadline error:", error);
            return false;
        }
    };

    // 支付相关
    const calcPayMoney = async (tokenId: number): Promise<number> => {
        try {
            const tx = await contract({
                functionName: "calcPayMoney",
                methodType: "read_exchange",
                args: [tokenId],
            });
            return tx ? parseInt(tx.toString()) : 0;
        } catch (error) {
            console.error("calcPayMoney error:", error);
            return 0;
        }
    };

    return {
        // 基本信息
        // Admin,
        // Implementation,
        // 角色查询
        buyerOf,
        completerOf,
        // 时间周期
        deliveryPeriod,
        refundRequestPeriod,
        refundReviewPeriod,
        // 时间戳
        deliveryTimestamp,
        purchaseTimestamp,
        refundRequestTimestamp,
        // 状态查询
        inRefundDeadline,
        inReviewDeadline,
        // 支付相关
        calcPayMoney,
    };
}
