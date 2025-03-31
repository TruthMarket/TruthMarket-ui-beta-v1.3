
// import React from 'react'
import styles from './styles.module.scss'
import token from '@assets/whitepaper/token.jpg'
import token2 from '@assets/whitepaper/token_2.jpg'

function Tokenomics() {
    return (
        <div className={styles.navr}>
            <h1 className={styles.title}>Token Economic Model</h1>

            <p>
                Truth Token is the native functional token of the Truth Market project, designed to support and incentivize various operations within the system. Acquired through crowdfunding on Juicebox, Truth Token serves not only as a medium of exchange but also as a crucial tool for promoting decentralized governance, incentivizing behavior, and ensuring data security. Below are the main functions and application scenarios of Truth Token:
            </p>
            <span className={styles.imageOne}>
                <img src={token} alt="" />
            </span>
            <p>
                
                Regarding Truth 100, the first 100 valid Truth Box that are made public on the mainnet will be rewards for the minters. What are valid Truth Box?
                <br />
                1. They must be criminal truths that are currently unpublished, meaning the criminal truths are made public on the Truth Market before they are known to everyone.
                <br />
                2. They can be made public directly or revealed after the transaction is completed.
                <br />
                3. We will conduct a vote through the DAO to determine whether the conditions for issuing Truth 100 are met.
            </p>
            {/* <p>
            </p> */}
            <span className={styles.imageOne}>
                <img src={token2} alt="" />
            </span>
            <h3>
                1,Governance Function:
            </h3>
            <p>
                Users holding Truth Token can participate in the platform's decentralized governance mechanism. By staking their Truth Tokens, users can obtain voting rights to participate in the voting of important proposals. The longer the locking period, the higher the user's voting weight, encouraging long-term holding and engagement with community development. This design ensures that the platform's decisions reflect the will of the majority of users, safeguarding the principle of decentralization.
            </p>
            <h3>
                2,Staking and Reward Mechanism:
            </h3>
            <p>
                Stakers of Truth Token can not only participate in governance but also enjoy staking rewards. These rewards will be distributed based on community voting, achieving fairness and transparency. Stakers can receive corresponding rewards periodically, further incentivizing users to actively participate in the ecosystem's development.
            </p>
            <h3>
                3,Liquidity Mining:
            </h3>
            <p>
                We will launch a liquidity mining program to encourage users to provide liquidity to the platform. Users participating in liquidity mining will receive additional Truth Token rewards to enhance asset liquidity and ensure smooth transactions. This creates profit opportunities for users while also strengthening the platform's financial stability.
            </p>
            <h3>
                4,Payment of Transaction Fees:
            </h3>
            <p>
                Truth Token can be used to pay for transaction fees and service charges within the platform, including storage confidentiality fees in Truth Box. This design simplifies the transaction process for users and provides a compliant value return mechanism for holders.
            </p>
            <h3>
                5,Fund Reserve:
            </h3>
            <p>
                A portion of Truth Tokens will be allocated to the project's fund reserve to support future research and development, as well as operational costs. This funding will ensure that the project can continue necessary technological upgrades and marketing efforts, ensuring the platform's long-term and stable development.
            </p>
            <h3>
                6,Proposals and Voting:
            </h3>
            <p>
                Users can use Truth Tokens to submit proposals for project improvements or new features, democratizing the platform's development direction. The voting process will be fully transparent based on blockchain technology, preventing any tampering and ensuring that every participant's voice is valued.
            </p>
            <p>
                Through these designs, Truth Token not only facilitates the smooth operation of various activities within the Truth Market ecosystem but also ensures a sense of participation and belonging for users. This economic model draws on the design concepts of many successful projects, such as Uniswap's liquidity mining and Compound's staking reward mechanisms, ensuring that users' interests are aligned with the healthy development of the platform. We believe that the design of this economic model will make Truth Market a sustainably developing decentralized market, providing every user with genuine and substantial value returns.
            </p>

        </div>
    )
}

export default Tokenomics;