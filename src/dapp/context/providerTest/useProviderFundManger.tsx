import { useContext, useEffect, useState } from 'react';
import { ContractContext } from '../index';

export function useTestFundManagerProvider() {
    const {
        // Admin_FundManager,
        // Implementation,
        adminFeeRate,
        buyerFeeRate,
        completerRewardRate,
        bidIncrementRate,
        // sellerFeeRate,
        serviceFeeRate,
        orderAmount,
        refundPermit,
        otherRewards,
        minterRewards,
        unallocatedFunds,
        allocatedFunds,
        totalRewards,
        isPauseWithdraw
    } = useContext(ContractContext);

    const [testReadFundManager, setTestReadFundManager] = useState<any>({});
    const TEST_TOKEN_ID = 1;
    const TEST_ADDRESS = '0x0000000000000000000000000000000000000000';

    useEffect(() => {
        const runTests = async () => {
            try {
                // 测试管理员相关函数
                // const adminResult = await Admin_FundManager();
                // console.log('Admin_FundManager 结果:', adminResult);

                // const implementationResult = await Implementation();
                // console.log('Implementation 结果:', implementationResult);

                // 测试费率相关函数
                const adminFeeRateResult = await adminFeeRate(TEST_TOKEN_ID);
                console.log('adminFeeRate 结果:', adminFeeRateResult);

                const buyerFeeRateResult = await buyerFeeRate(TEST_TOKEN_ID);
                console.log('buyerFeeRate 结果:', buyerFeeRateResult);

                const completeRewardsRateResult = await completerRewardRate();
                console.log('completeRewardsRate 结果:', completeRewardsRateResult);

                const bidIncrementRateResult = await bidIncrementRate();
                console.log('bidIncrementRate 结果:', bidIncrementRateResult);


                const serviceFeeRateResult = await serviceFeeRate();
                console.log('serviceFeeRate 结果:', serviceFeeRateResult);

                // 测试订单和收入相关函数
                const orderAmountResult = await orderAmount(TEST_TOKEN_ID, TEST_ADDRESS);
                console.log('orderAmount 结果:', orderAmountResult);

                const refundPermitResult = await refundPermit(TEST_TOKEN_ID);
                console.log('refundPermit 结果:', refundPermitResult);

                const otherRewardsResult = await otherRewards(TEST_TOKEN_ID, TEST_ADDRESS);
                console.log('otherRewards 结果:', otherRewardsResult);

                const minterRewardsResult = await minterRewards(TEST_TOKEN_ID);
                console.log('minterRewards 结果:', minterRewardsResult);

                // 测试资金相关函数
                const unallocatedFundsResult = await unallocatedFunds();
                console.log('unallocatedFunds 结果:', unallocatedFundsResult);

                const allocatedFundsResult = await allocatedFunds();
                console.log('allocatedFunds 结果:', allocatedFundsResult);

                const totalRewardsResult = await totalRewards();
                console.log('totalRewards 结果:', totalRewardsResult);

                const pauseWithdrawResult = await isPauseWithdraw();
                console.log('isPauseWithdraw 结果:', pauseWithdrawResult);

                // 将所有结果存储在状态中
                setTestReadFundManager({
                    // admin: adminResult,
                    // implementation: implementationResult,
                    fees: {
                        adminFee: adminFeeRateResult,
                        buyerFee: buyerFeeRateResult,
                        completeFee: completeRewardsRateResult,
                        bidIncrementFee: bidIncrementRateResult,
                        serviceFee: serviceFeeRateResult
                    },
                    orders: {
                        amount: orderAmountResult,
                        refundPermit: refundPermitResult,
                        otherRewards: otherRewardsResult,
                        minterRewards: minterRewardsResult
                    },
                    funds: {
                        unallocated: unallocatedFundsResult,
                        allocated: allocatedFundsResult,
                        total: totalRewardsResult,
                        paused: pauseWithdrawResult
                    }
                });

            } catch (error) {
                console.error('测试过程中发生错误:', error);
                setTestReadFundManager({
                    error: '测试失败，请查看控制台了解详细信息'
                });
            }
        };

        runTests();
    }, []); // 仅在组件挂载时运行一次

    return testReadFundManager;
}
