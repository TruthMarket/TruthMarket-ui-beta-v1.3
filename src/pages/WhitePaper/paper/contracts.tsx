
// import React from 'react'
import styles from './styles.module.scss'
import contracts from '@assets/whitepaper/contracts.jpg'

function Contract() {
    return (
        <div className={styles.navr}>
            <h1 className={styles.title}>Project contracts</h1>
            <p>
                The project consists of 9 main contracts.
            </p>

            {/* <span className={styles.imageOne}>
                <img src={img01} alt="" />
            </span>
            <span className={styles.imageTwo}>
                <img src="" alt="" />
                <img src="" alt="" />
            </span> */}
            <span className={styles.imageOne}>
                <img src={contracts} alt="" />
            </span>
            <p>
                Truth Box is a contract based on the ERC721 standard, where each NFT corresponds to a Box containing multiple important data points. The Box Status contract manages the transaction status of Truth Box and is called by the Exchange contract. And responsible for executing important public information related to Truth Box.
            </p>
            <p>
                
                The Exchange contract is responsible for transactions involving Truth Box, including operations such as selling/auctioning, purchasing, shipping, requesting refunds, and completing transactions.
                <br />
                The Fund Manager contract handles the management of transaction funds, including fees, rewards, refunds, and payment of confidentiality fees.
                <br />
                The Encryption Storage contract is a contract for storing encrypted data in transactions, which includes the office public key, the office encrypted data during the sale of the Box, and the buyer's encrypted data during the delivery.
            </p>

            <p>
                The contracts related to the DAO mainly consist of two parts:
                <br />
                The first is the Staking contract, which is used to determine the eligibility and participation of community members;
                <br />
                The second is the Governance contract, which is responsible for the formulation and review of governance proposals, as well as the auditing of transactions related to Truth Box and the Exchange.
                <br />
                This structure ensures that community members can play an active role in the development and decision-making of the platform.
            </p>
            <p>
                The Confidentiality fee contract is used to make payments when there is a need to extend the confidentiality period of an Truth Box. This contract will significantly raise the cost for criminals attempting to conceal their crimes, thereby encouraging them to choose to surrender themselves to authorities.
            </p>
            <p>
                The Token is the unique cryptocurrency of the project and plays a crucial role in its operation. It is well understood by every user participating in the Web3 space.
            </p>


        </div>
    )
}

export default Contract;