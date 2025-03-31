// 这个组件是用来筛选当前的用户是否是minter、owner、seller、completer，buyer，admin
import { useContext} from 'react';
import { useWalletContext } from '../../../context/useAccount/WalletContext';
import { useRoleContext } from '../useState/roleContext/RoleContext';
// import { buyerOf,completerOf } from '../../../../useReadWrite/exchange/readExchange';
// import { ownerOf, minterOf } from '../../../../useReadWrite/truthBox/readTruthBox';
import { RoleType } from '../../../type/contractDate';
import { useNftDetailContext } from '../useState/nftDetail';
import { Address_0 } from '../../../constants/abiAddress_v1_3';
import { ContractContext } from '../../../context';

export const useFilterRole = () => {
    const {
        buyerOf,
        completerOf,
        ownerOf,
        minterOf
    } = useContext(ContractContext)

    const { updateNftDetail_two } = useNftDetailContext() || {};

    const { updateUserRole } = useRoleContext() || {}
    const { accountRole, address, isConnected } = useWalletContext() || {};
    const filterRole = async (tokenId: number,) => {
        if (!address || !isConnected) {
            updateUserRole?.(undefined);
            return;
        }
        // const seller = sellerOf(tokenId);
        const buyer = await buyerOf(tokenId);
        const owner = await ownerOf(tokenId);
        const minter = await minterOf(tokenId);
        const completer = await completerOf(tokenId)

        if (minter) {
            updateNftDetail_two?.('minter', minter);
        }
        if (owner) {
            updateNftDetail_two?.('owner', owner);
        }
        if (buyer !== Address_0) {
            updateNftDetail_two?.('buyer', buyer);
            updateNftDetail_two?.('noBuyer', false);
        } else {
            updateNftDetail_two?.('noBuyer', true);
        }
        const role = (): RoleType => {
            if (address === minter) return 'minter';
            if (accountRole === 'admin') return 'admin';
            // if (address === seller) return 'seller';
            if (address === buyer) return 'buyer';
            if (address === completer) return 'completer';
            return 'other';
        };
        updateUserRole?.(role());

    }

    return {filterRole};


}