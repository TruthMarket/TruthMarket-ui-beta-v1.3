
// import React from 'react'
import styles from './styles.module.scss'
import transaction from '@assets/whitepaper/transactionProcess.jpg'

function Transaction() {
    return (
        <div className={styles.navr}>
            <h1 className={styles.title}>Transaction Process</h1>
            <p>
                This is a very detailed flowchart of the Truth Box trading process, which clearly demonstrates how the various associated contracts and modules interact during the transaction.
            </p>

            <span className={styles.imageOne}>
                <img src={transaction} alt="" />
            </span>

            <p>
                Of course, the first step is to upload the evidence of the crime and mint a Truth Box, and then we can proceed with the transaction.
            </p>
            
            <p>
                1. When the minter sells or auctions the Box, they will generate a key pair through the encryption module, and then encrypt the IPFS CID and password to obtain the encrypted office data. The encrypted data and the minter's public key are stored in the Encryption Storage contract.
                <br />
                2. When the buyer makes a purchase, they also generate a key pair through the encryption module, and their public key is stored in the Encryption Storage contract.
                <br />
                3. During delivery, the buyer's public key is used to encrypt the IPFS CID and password, resulting in the buyer's encrypted data, which is stored in the Encryption Storage contract.
                <br />
                4. The buyer uses the key pair to decrypt the encrypted data via the decryption module, allowing them to obtain the original CID and password, enabling them to view the evidence of the crime in the Truth Box.
                <br />
                5. If the buyer applies for a refund, they will need to upload their private key to be stored in the contract, which means that everyone can decrypt and view the information in the Box. The DAO community will also review these details to process the refund.
                <br />
                6. If the buyer does not apply for a refund and does not execute "Complete Order," after the refund application period ends, others can also execute this operation.
                <br />
                7. After the transaction is completed, the buyer decides whether to pay a confidentiality fee to extend the confidentiality period of the Box. When the confidentiality period expires, the evidence of the crime in the Box will be made public.
            </p>
            
            <p>
                It is important to note that:
                <br />
                It should be noted that when the minter sells the Box, the uploaded office encrypted data does not allow others to obtain the original CID and password or access the information in the Truth Box. This is because we have implemented a threshold encryption algorithm for the office's private key, which is distributed among multiple core members of the DAO community. A majority vote is required to decrypt the data.
                <br />
                The detailed operational mechanism will be explained when the DAO governance is launched. This feature is not fully developed in the current testing version.
            </p>
        </div>
    )
}

export default Transaction;