
// import React from 'react'
import styles from './styles.module.scss'
import statusDuration from '@assets/whitepaper/statusDuration.jpg'
import statusProcess from '@assets/whitepaper/BoxStatusProcess.jpg'
import statusPeriod from '@assets/whitepaper/statusPeriod.jpg'

function StatusMap() {
    return (
        <div className={styles.navr}>
            <h1 className={styles.title}>Truth Box Status</h1>
            <p>
                
                We have indicated in the Project Contracts that after the minter uploads criminal evidence, an ERC721 standard NFT Box will be minted, which we call Truth Box.
                Each Box contains an enumeration value called Status, which can be one of the following: Storing, Selling, Auctioning, Delivering, Refunding, Completed, or Published.
            </p>
            <span className={styles.imageOne}>
                <img src={statusDuration} alt="" />
            </span>
            <p>
                {/*  */}
                We have indicated in the Project Contracts that after the minter uploads criminal evidence, an ERC721 standard NFT Box will be minted, which we call Truth Box.
                In our design, each Box contains an enumeration value called Status, which can be one of the following: Storing, Selling, Auctioning, Delivering, Refunding, Completed, or Published.
                Below is the flowchart illustrating the changes in the Status values.
            </p>
            <span className={styles.imageOne}>
                <img src={statusProcess} alt="" />
            </span>
            
            <p>
                Let us briefly explain:
                <br />
                1. The minter can choose between two modes when minting: Store or Public.
                <br />
                2. Boxes with a Status value of Storing can be Sold or Auctioned.
                <br />
                3. If the sale or auction period ends without any buyers (we assume buyers are criminals), the Box will be made public, and the criminal evidence contained within it will be disclosed.
                <br />
                4. If there are buyers, the seller must proceed with delivery, and the Status becomes Delivering.
                <br />
                5. The buyer can choose to request a refund within a limited timeframe; if a refund is requested, the criminal evidence in the Box must be made public, and the Status becomes Refunding.
                <br />
                6. If the buyer confirms the completion of the transaction, the Status value becomes Completed.
                <br />
                7. Subsequently, the buyer must decide whether to pay a confidentiality fee to extend the confidentiality period of the Box. Once the confidentiality period expires, the criminal evidence in the Box will be made public.
            </p>
            <p>
                The following chart shows the duration of time that the Status remains at each value.
            </p>
            <span className={styles.imageOne}>
                <img src={statusPeriod} alt="" />
            </span>
            
            <p>
                Let’s briefly summarize:
                <br />
                1. Storing has no time limit, which means that the minter can store the evidence of the crime in the Truth Market almost permanently.
                <br />
                2. When the Box is in Selling mode, it can be sold for up to one year. In Auctioning mode, there is an initial auction period of 30 days, and each time a buyer participates in the auction, 30 days will be added.
                <br />
                3. Once the buyer completes the Purchase or Bid, the minter has 30 days to deliver. A refund fee will be incurred after 30 days. If the delivery exceeds 100 days, the full amount will be refunded to the buyer.
                <br />
                4. After delivery, the buyer has 7 days to decide whether to apply for a refund. If the buyer chooses to apply for a refund, the DAO will have a 30-day review period to vote on the transaction.
                <br />
                5. After completing the order, an additional 30-day confidentiality period can be added. The buyer can decide before the confidentiality period expires whether to pay a confidentiality fee. Each time the confidentiality fee is paid, it will extend the confidentiality period by one year.
            </p>

            {/* <span className={styles.imageOne}>
                <img src={img01} alt="" />
            </span>
            <span className={styles.imageTwo}>
                <img src="" alt="" />
                <img src="" alt="" />
            </span> */}
        </div>
    )
}

export default StatusMap;