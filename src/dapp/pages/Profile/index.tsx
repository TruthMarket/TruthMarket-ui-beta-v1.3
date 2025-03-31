import React, {
    // useState, 
    // useEffect 
} from 'react';

import styles from './styles.module.scss';
import { useAccount } from 'wagmi';
// import { EventProvider } from './context/eventListContext';
import { TabProvider } from './context/tabContext';
import { DisplayProvider } from './context/displayContext';
import DataBar from './DataBar/DataBar';
import DisplayContent from './display/DisplayContent';
import { WithdrawProvider } from './context/withdrawContext';

const Profile: React.FC = () => {
    const { address } = useAccount();

    return (
        <DisplayProvider>
            {/* <EventProvider> */}
                <TabProvider>
                    <WithdrawProvider>
                        <div className={styles.home}>
                            <div className={styles.container}>
                                <div className={styles.account}>
                                    <h2>Your account:</h2>
                                    <p>{address}</p>
                                </div>

                                <div className={styles.dataBar}>
                                    <DataBar />
                                </div>

                                <div className={styles.content}>
                                    <DisplayContent />
                                </div>
                            </div>
                        </div>
                    </WithdrawProvider>
                </TabProvider>
            {/* </EventProvider> */}
        </DisplayProvider>
    );
};

export default Profile;