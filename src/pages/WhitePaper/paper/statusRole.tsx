
// import React from 'react'
import styles from './styles.module.scss'
import statusRoleMap2 from '@assets/whitepaper/statusRoleMap2.jpg'
import statusRoleMap from '@assets/whitepaper/statusRoleMap.jpg'

function StatusRole() {
    return (
        <div className={styles.navr}>
            <h1 className={styles.title}>Status process and role map</h1>
            <p>
                This is a general diagram that visually illustrates each stage of the Truth Box that various roles can point to.
            </p>

            {/* <span className={styles.imageOne}>
                <img src={img01} alt="" />
            </span>
            <span className={styles.imageTwo}>
                <img src="" alt="" />
                <img src="" alt="" />
            </span> */}
            <span className={styles.imageOne}>
                <img src={statusRoleMap2} alt="" />
            </span>
            
            <p>
                Let’s go through each point one by one:
                <br />
                1. The minter mints a Truth Box and can choose to sell or auction it.
                <br />
                2. If the Box is in Sell mode, there can only be one buyer. If it is in Auction mode, anyone can participate in the bidding, and the highest bidder will become the buyer.
                <br />
                3. After completing the purchase or auction, the Deliver action can be executed. In the testing version, the minter, admin, and DAO can all perform the Deliver operation; however, we may make adjustments in the mainnet, as the admin should not be able to execute Deliver. If Deliver is not completed within 100 days, the buyer can also execute Deliver, which effectively acts as a full refund.
                <br />
                4. After the Deliver, if the buyer applies for a refund, the transaction will enter a review process. The DAO community will vote on whether to approve or deny the refund request. Of course, the buyer can cancel the refund request, and the minter can directly agree to the refund.
                <br />
                5. If the buyer does not apply for a refund, the buyer can execute Complete. If it is not the buyer, they will need to wait until the refund application period has expired before executing Complete.
                <br />
                6. After the transaction is complete, the buyer can decide whether to continue paying a confidentiality fee to extend the confidentiality period of the Box. The buyer can also choose to execute Public at any time, which will make the Box public. If it is the minter or DAO, they will need to wait until the confidentiality period has expired before executing Public.
            </p>

            <p>
                This is a more detailed flowchart, which overlaps with the content of the previous page but provides a more comprehensive display of the status values for each step in the transaction process of every Box within the Truth Market project, as well as the relevant roles involved in each step.
            </p>
            <span className={styles.imageOne}>
                <img src={statusRoleMap} alt="" />
            </span>

        </div>
    )
}

export default StatusRole;