import styles from './styles.module.scss'
import React from 'react';
import { Steps } from 'antd';

// const description = {
//     first: 'Project Initiation and Research:Discussing Project Concepts (Ideation),Brainstorm ideas, gather inputs and suggestions from team members, and clarify the core functions and development goals of the project.  Technical Feasibility Analysis:Evaluate the technical feasibility of project implementation and study the advantages and disadvantages of different blockchain platforms (such as Ethereum, Polygon, etc.).  Develop a preliminary technical architecture diagram and development plan.',
// };

const description = {
    step_1: (
        <>
            <p className={styles.titleMap}>Project Initiation and Research</p>
            <p className={styles.text}>
                Discussing Project Concepts (Ideation): <br />
                Brainstorm ideas, gather inputs and suggestions from team members, and clarify the core functions and development goals of the project.</p>
            <p className={styles.text}>
                Technical Feasibility Analysis:<br />
                Evaluate the technical feasibility of project implementation and study the advantages and disadvantages of different blockchain platforms.</p>
        </>
    ),
    step_2: (
        <>
            <p className={styles.titleMap}>Smart Contract v1.0</p>
            <p className={styles.text}>
                Design and develop the initial version of the smart contract. <br />
                Conduct thorough unit testing and functional testing of the smart contract to ensure its reliability across various scenarios.
            </p>
        </>
    ),
    step_3: (
        <>
            <p className={styles.titleMap}>Smart Contract v1.1</p>
            <p className={styles.text}>
                Refactor the architecture of the smart contract following principles of simplicity, lightweight, and security, while continuing to test.
            </p>
        </>
    ),
    step_4: (
        <>
            <p className={styles.titleMap}>Web DApp Development</p>
            <p className={styles.text}>
                Implement basic interaction functionalities on the web, including integration with the Ethereum network, decentralized storage, and encryption/decryption modules.
            </p>
        </>
    ),
    step_5: (
        <>
            <p className={styles.titleMap}>Smart Contract v1.2, test version</p>
            <p className={styles.text}>
                Testing: <br />
                Continue to refine the smart contract and conduct real interaction testing of version 1.2 on the testnet, while also optimizing and adjusting the web DApp.
            </p>
        </>
    ),
    step_6: (
        <>
            <p className={styles.titleMap}>Smart Contract v1.3, test version</p>
            <p className={styles.text}>
                Testing: <br />
                Open final testing to everyone to ensure the project operates stably across a wider range of scenarios.
            </p>

        </>
    ),
    step_7: (
        <>
            <p className={styles.titleMap}>Mainnet Launch and Airdrop</p>
            <p className={styles.text}>
                Truth Market is officially deployed on the Ethereum mainnet. <br />
                Create a liquidity pool to provide liquidity support and incentives. <br />
                Early bird airdrop rewards for users who participated in the initial testing.
            </p>
            <p className={styles.text}>
                The crowdfunding has ended.
            </p>
        </>
    ),
    step_8: (
        <>
            <p className={styles.titleMap}>Staking and DAO Community Governance Features</p>
            <p className={styles.text}>
                Introduce a DAO governance structure to establish a preliminary decentralized autonomous organization (DAO) governance system.

            </p>
        </>
    ),
    step_9: (
        <>
            <p className={styles.titleMap}>DAO Community Fund</p>
            <p className={styles.text}>
                Establish an operational and development fund for the project, dedicated to supporting future technological upgrades, marketing initiatives, and community activities.
            </p>
        </>
    ),
    step_10: (
        <>
            <p className={styles.titleMap}>Feature Expansion</p>
            <p className={styles.text}>
                Development and testing of the bounty board section.
            </p>
        </>
    ),
};

const Roadmap: React.FC = () => {
    return (
        <div className={styles.navr}>
            <h1 className={styles.title}>Roadmap</h1>
            <Steps
                direction="vertical"
                current={5}
                items={[
                    {
                        title: 'Finished',
                        description: description.step_1,
                    },
                    {
                        title: 'Finished',
                        description: description.step_2,
                    },
                    {
                        title: 'Finished',
                        description: description.step_3,
                    },
                    {
                        title: 'Finished',
                        description: description.step_4,
                    },
                    {
                        title: 'Finished',
                        description: description.step_5,
                    },
                    {
                        title: 'In Progress',
                        description: description.step_6,
                    },
                    {
                        title: 'Waiting',
                        description: description.step_7,
                    },
                    {
                        title: 'Waiting',
                        description: description.step_8,
                    },
                    {
                        title: 'Waiting',
                        description: description.step_9,
                    },
                    {
                        title: 'Waiting',
                        description: description.step_10,
                    },
                ]}
            />
        </div>
    )
}

export default Roadmap;