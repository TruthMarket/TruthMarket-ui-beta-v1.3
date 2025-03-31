import { useWriteContract } from 'wagmi';
import { Abi } from 'viem'

interface ContractArgs{
    address: `0x${string}`,
    abi:Abi,
}

export const useContractWrite = () => {
    const { writeContract, status } = useWriteContract();

    const executeWrite = async (
        contract: ContractArgs,
        functionName: string,
        args?: any[]
    ) => {
        const {address,abi}=contract;

        try {
            const writeParams: any = {
                address,
                abi,
                functionName,
            };

            if (args && args.length > 0) {
                writeParams.args = args;
            }

            const result = writeContract(writeParams);
            console.log(`${functionName} successfully written:`, result);
            return result;
        } catch (error) {
            console.error(`${functionName} failed written:`, error);
            throw error;
        }
    };

    return { executeWrite, status };
};

