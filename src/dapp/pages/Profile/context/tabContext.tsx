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

export const TabProvider = ({ children }: { children: ReactNode }) => {
    const [currentTab, setCurrentTab] = useState<string>('minter');
    const [active, setActive] = useState<string>('minter');
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

export const useTabContext = () => useContext(Context);
