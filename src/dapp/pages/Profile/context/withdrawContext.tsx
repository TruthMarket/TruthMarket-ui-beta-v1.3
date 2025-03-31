import React, {
    // createContext,
    useContext,
    useState,
    ReactNode,
    // useEffect,
    // useRef,
} from 'react';
// import { NftDetailType } from '../../../type/contractDate';

// export type string = 'Minter'|'Seller'|'Buyer'|'Completer'|'Total_income'|'Unclaimed';

interface ContextType {
    currentTab: string;
    setCurrentTab: (data: string) => void;
    active: string;
    setActive: (data: string) => void;
    withdrawList: number[];
    setWithdrawList: (data: number[]) => void;
    withdrawType: string;
    setWithdrawType: (data: string) => void;
}

const Context = React.createContext<ContextType | null>(null);

export const WithdrawProvider = ({ children }: { children: ReactNode }) => {
    const [currentTab, setCurrentTab] = useState<string>('Minter');
    const [active, setActive] = useState<string>('Minter');
    const [withdrawList, setWithdrawList] = useState<number[]>([]);
    const [withdrawType, setWithdrawType] = useState<string>('');

    return (
        <Context.Provider value={{
            currentTab,
            setCurrentTab,
            active,
            setActive,
            withdrawList,
            setWithdrawList,
            withdrawType,
            setWithdrawType,
        }}>
            {children}
        </Context.Provider>
    );
};

export const useWithdrawContext = () => useContext(Context);
