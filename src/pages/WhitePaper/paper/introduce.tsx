
// import React from 'react'
import styles from './styles.module.scss'
import logo from '@assets/whitepaper/logo.jpg'

function Introduce() {
    return (
        <div className={styles.navr}>
            <h1 className={styles.title}>Project Introduction</h1>

            <p>
                Truth Market is a Web3.0 decentralized truth trading market based on Ethereum smart contracts and IPFS decentralized storage,
                aimed at utilizing blockchain and cryptographic technologies to achieve the secure storage, trading, and disclosure of criminal evidence.
                We are committed to creating a transparent, fair, and trustless proof mechanism to support social justice.
            </p>
            <p>
                Truth Market shares many similarities with WikiLeaks and Poly Market. Truth Market is dedicated to uncovering a vast economic market for criminal truths, closely integrating Web 3.0 with the real world. We aim to organically merge truth with financial rewards, creating a perfect economic model.
            </p>
            <span className={styles.imageOne}>
                <img src={logo} alt="" />
            </span>
            <h3>Simple Process:</h3>
            <p>
                Truth Heroes (minters) upload criminal evidence and mint a Truth Box,
                after which they can choose to store, sell, or disclose it. Buyers are required to use Truth Coin to place their orders for purchase. A small portion of the official transaction fee will be deducted from the entire transaction, and the remaining funds will serve as income for the minter.
            </p>
            <p>
                If the judicial department purchases the Truth Box, they can use the criminal evidence contained within it to more swiftly bring offenders to justice. This mechanism not only effectively enhances the speed of case handling but also improves the efficiency of the judicial department, thereby better upholding fairness and justice in society and providing the public with a safer living environment.
            </p>
            <p>
                If a criminal purchases the Truth Box, we need not worry excessively, as Truth Market has a confidentiality fee mechanism that increases annually by a certain coefficient,
                making it difficult for any criminal to bear such a substantial expense easily. If a criminal fails to pay the confidentiality fee on time,
                the criminal evidence within the Truth Box will be made public. Therefore, for criminals, the wisest choice is to surrender and confess rather than attempt to struggle or evade legal consequences. Confessing not only demonstrates remorse but may also lead to more lenient treatment.
            </p>
        </div>
    )
}

export default Introduce;