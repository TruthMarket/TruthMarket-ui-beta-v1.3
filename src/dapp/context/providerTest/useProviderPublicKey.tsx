import { useContext, useEffect, useState } from 'react';
import { ContractContext } from '../index';

export function useTestPublicKeyProvider() {
    const {
        // Admin_PublicKey,
        PublicKey_minter,
        PublicKey_office,
        PublicKey_buyer,
        PrivateKey_buyer,
        getCryptData_office,
        getCryptData_buyer,
        officeKeyCounts,

    } = useContext(ContractContext);

    const [testReadPublicKey, setTestReadPublicKey] = useState<any>({});
    const TEST_TOKEN_ID = 1;

    useEffect(() => {
        const runTests = async () => {
            try {
                // 测试 Admin_PublicKey
                // const adminResult = await Admin_PublicKey();
                // console.log('Admin_PublicKey 结果:', adminResult);

                // 测试 PublicKey_minter
                const minterResult = await PublicKey_minter(TEST_TOKEN_ID);
                console.log('PublicKey_minter 结果:', minterResult);

                // 测试 PublicKey_office
                const officeResult = await PublicKey_office(TEST_TOKEN_ID);
                console.log('PublicKey_office 结果:', officeResult);

                // 测试 PublicKey_office
                const buyerResult = await PublicKey_buyer(TEST_TOKEN_ID);
                console.log('PublicKey_buyer 结果:', buyerResult);

                // 测试 PublicKey_office
                const privateResult = await PrivateKey_buyer(TEST_TOKEN_ID);
                console.log('PrivateKey_buyer 结果:', privateResult);

                // 测试 getCryptData_office
                const cryptOfficeResult = await getCryptData_office(3);
                console.log('getCryptData_office 结果:', cryptOfficeResult);

                // 测试 getCryptData_buyer
                const cryptUserResult = await getCryptData_buyer(3);
                console.log('getCryptData_buyer 结果:', cryptUserResult);

                // 测试 officeKeyCounts
                const countsResult = await officeKeyCounts();
                console.log('officeKeyCounts 结果:', countsResult);

                // 将所有结果存储在状态中
                setTestReadPublicKey({
                    minter: minterResult,
                    office: officeResult,
                    buyer: buyerResult,
                    private: privateResult,
                    cryptOffice: cryptOfficeResult,
                    cryptUser: cryptUserResult,
                    tokenArray: countsResult
                });

            } catch (error) {
                console.error('测试过程中发生错误:', error);
                setTestReadPublicKey({
                    error: '测试失败，请查看控制台了解详细信息'
                });
            }
        };

        runTests();
    }, []); // 仅在组件挂载时运行一次

    return testReadPublicKey;
}
