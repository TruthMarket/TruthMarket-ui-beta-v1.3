
// import React from 'react'
import styles from './styles.module.scss'
// import img01 from '@assets/image/03.jpg'

function Safety() {
    return (
        <div className={styles.navr}>
            <h1 className={styles.title}>How to ensure safety</h1>

            {/* <span className={styles.imageOne}>
                <img src={img01} alt="" />
            </span> */}
            {/* <span className={styles.imageTwo}>
                <img src="" alt="" />
                <img src="" alt="" />
            </span> */}
            {/* <span className={styles.imageThree}>
                <img src={img01} alt="" />
                <img src={img01} alt="" />
                <img src={img01} alt="" />
            </span> */}

            <h3>
                1. Security
            </h3>
            <p>
                We understand that many non-Web 3.0 communities may have concerns regarding the security of this emerging technology. However, Truth Market has implemented stringent measures to ensure that user data and transactions are fully protected in a Web 3.0 environment. In Truth Market, we leverage the decentralized nature of the technology to eliminate the reliance on trust in a single entity or individual. Through smart contracts and blockchain technology, all evidence, transactions, and rewards are transparent and traceable, allowing users to verify the authenticity of the information themselves.
            </p>
            <h3>
                2. Trust Model Based on Ethereum
            </h3>
            <p>
                All smart contracts for this project are built on the Ethereum EVM (Ethereum Virtual Machine) chain, utilizing a Proof of Staked Authority (PoSA) consensus mechanism. Ethereum's years of operational history have proven its security, reliability, and stability, making it one of the most trusted blockchain platforms globally.
            </p>
            <h3>
                3. Advanced Encryption Technology
            </h3>
            <p>
                We employ the AES symmetric encryption algorithm, combined with a mechanism for public key encryption and private key decryption, to ensure the security and integrity of critical data. Only users holding the private key can access and decrypt their private data, significantly reducing the risk of external attacks.
            </p>
            <h3>
                4. Resistance to Computational Attacks
            </h3>
            <p>
                In the current technological landscape, even highly skilled hackers attempting to obtain users' private keys through exhaustive methods and computational collision have an almost zero chance of success. According to existing computational technology, even with the most advanced supercomputers today, cracking a private key would take billions of years. This means that, with reasonable security measures in place, users' private keys are almost absolutely protected.
            </p>
            <h3>
                5. Decentralized Storage
            </h3>
            <p>
                By utilizing the IPFS (InterPlanetary File System), we achieve decentralized data storage, further ensuring that data is difficult to tamper with or delete. This design not only enhances the availability and security of data but also reduces the risk of single points of failure.
            </p>
            <h3>
                6. Transparency and Auditability
            </h3>
            <p>
                All transactions and data uploads are recorded on the blockchain and possess immutable characteristics, ensuring transparency and auditability. Users can review and verify their transaction records at any time, which enhances trust in the platform.
            </p>

        </div>
    )
}

export default Safety;