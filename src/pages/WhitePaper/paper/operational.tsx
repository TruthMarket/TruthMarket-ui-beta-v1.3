
// import React from 'react'
import styles from './styles.module.scss'
import process from '@assets/whitepaper/simpleProcess.jpg'
import confidFee from '@assets/whitepaper/confidentialityFee.jpg'
import structure from '@assets/whitepaper/structure.jpg'

function Operational() {
    return (
        <div className={styles.navr}>
            <h1 className={styles.title}>Project Operational Process</h1>
            <p>
                
                The operation process of the Truth Market can be simply divided into the following steps:
                <br />
                1. Mint: The minter uploads evidence of the crime and mints a Truth Box.
                <br />
                2. Exchange: The minter sells or auctions the Truth Box, and the buyer (the criminal) pays with tokens to make the purchase, allowing the minter to earn income rewards.
                <br />
                3. Secrecy: The buyer is required to pay an annual secrecy fee to ensure that the Truth Box remains confidential.
                <br />
                4. Public: The Truth Box becomes public if the secrecy fee is not paid or for other reasons.
            </p>

            <span className={styles.imageOne}>
                <img src={process} alt="" />
            </span>

            <p>
                Note here: The confidentiality fee paid by buyers will increase every year, with a default increment of 100%. However, this increment can be adjusted in the DAO governance contract.
            </p>
            <span className={styles.imageOne}>
                <img src={confidFee} alt="" />
            </span>

            <p>
                
                The image below provides a more detailed project structure and operating process. It clearly shows the Ethereum smart contracts, IPFS and AR decentralized storage, encryption and decryption functional modules, as well as the interaction processes involving the minter, buyer, completer, and DAO.
                    
            </p>
            <span className={styles.imageOne}>
                <img src={structure} alt="" />
            </span>

            

        </div>
    )
}

export default Operational;