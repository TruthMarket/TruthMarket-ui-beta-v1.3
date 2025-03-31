// HomePage.tsx
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import LeftBar from './LeftBar';
// import tab from './data';
//
import Introduce from './paper/introduce';
import SocialConditions from './paper/socialConditions';
import Contracts from './paper/contracts';
import Value from './paper/value';
import Insights from './paper/insights';
import Future from './paper/future';
import Dao from './paper/dao';
import Tokenomics from './paper/tokenomics2';
import Blacklist from './paper/blacklist';
import RewardsFee from './paper/rewardsFee';
import Significant from './paper/significant';
import RoadMap from './paper/roadmap';
import Thanks from './paper/thanks';
import Operational from './paper/operational';
import Logic from './paper/logic';
import Safety from './paper/safety';
import StatusRole from './paper/statusRole';
import TruthBoxStatus from './paper/statusMap';
import Transaction from './paper/transaction';

const WhitePaperPage: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [isShow, setIsShow] = useState(true);
    const [isLeftIcon, setIsLeftIcon] = useState(true);
    const [isLeft, setIsLeft] = useState(false);

    const handleIconClick = () => {
        setIsLeftIcon(!isLeftIcon);
        setIsLeft(!isLeft);
    };

    const updateView = () => {
        const width = window.innerWidth;
        if (width < 769) {
            setIsLeft(false);
            setIsShow(true);
        } else {
            setIsLeft(true);
            setIsShow(false);
        }
    };

    useEffect(() => {
        updateView();
        window.addEventListener('resize', updateView);
        return () => {
            window.removeEventListener('resize', updateView);
        };
    }, []);

    const renderContent = () => {
        switch (selectedTab) {
            case 1:
                return <Introduce />;
            case 2:
                return <SocialConditions />;
            case 3:
                return <Logic />;
            case 4:
                return <Contracts />;
            case 5:
                return <TruthBoxStatus />;
            case 6:
                return <StatusRole />;
            case 7:
                return <Operational />;
            case 8:
                return <Transaction />;
            case 9:
                return <Tokenomics />;
            case 10:
                return <RewardsFee />;
            case 11:
                return <RoadMap />;
            case 12:
                return <Value />;
            case 13:
                return <Dao />;
            case 14:
                return <Blacklist />;
            case 15:
                return <Safety />;
            case 16:
                return <Insights />;
            case 17:
                return <Significant />;
            case 18:
                return <Future />;
            case 19:
                return <Thanks />;
            default:
                return <Introduce />;
        }
    };

    return (
        <div className={styles.whitepaper}>
            <div className={styles.none}>
                {isShow && (
                    <p className={styles.tips}>
                        Please switch to a larger screen for better reading
                    </p>
                )}
            </div>
            <div className={styles.container}>
                <LeftBar
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    isShow={isShow}
                    isLeft={isLeft}
                    isLeftIcon={isLeftIcon}
                    handleIconClick={handleIconClick}
                />
                <div className={styles.contents}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default WhitePaperPage;