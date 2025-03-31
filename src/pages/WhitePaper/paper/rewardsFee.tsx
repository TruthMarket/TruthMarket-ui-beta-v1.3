
// import React from 'react'
import styles from './styles.module.scss'
import allocation from '@assets/whitepaper/allocation.jpg'
import feeRate from '@assets/whitepaper/feeRate.jpg'

function RewardsFee() {
    return (
        <div className={styles.navr}>
            <h1 className={styles.title}>Rewards and Fee allocation</h1>
            <p>
                In Truth Market, the rewards is an essential component for ensuring the platform's sustainable development. Below are the specific fee settings and their management methods:
            </p>
            <span className={styles.imageOne}>
                <img src={allocation} alt="" />
            </span>

            <h3>
                1,Transaction Fee: 5%
            </h3>
            <p>
                A 5% transaction fee will be charged on all transactions. This fee will be managed by the decentralized autonomous organization (DAO) community. Through transparent management, the DAO community will ensure that these fees are utilized effectively, while also promoting community development. The transaction fees will be proportionally allocated to various community funds, including the DAO governance fund and the ecological development fund, ensuring that the funds are spent on projects beneficial for the healthy development of the community.
            </p>
            <h3>
                2,Public Rewards Rate: 5%
            </h3>
            <p>

                Anyone (minter, buyer, or DAO) who executes Public will receive a reward of 5% of the Box's sale price, in order to encourage them to be more proactive in making the criminal evidence in the Truth Box public.
            </p>
            <h3>
                3,Deliver Rewards Rate: 3%
            </h3>
            <p>

                If the DAO contract executes the Deliver action, it will receive a reward of 3% of the Box's sale price. If the minter executes this operation, there will be no fee generated for this action, meaning it will be counted as part of the minter's rewards.
            </p>
            <h4>
                About Timeout Penalty:
            </h4>
            <p>

                If a buyer successfully purchases or bids on a Box and it has not been shipped after the delivery deadline, a late fee will be incurred (1% per day). The late fee will be refunded to the buyer. If it exceeds 100 days, the buyer will be able to execute a full refund.
            </p>
            <h3>
                4,Completer Rewards Rate: 3%
            </h3>
            <p>

                Excluding the minter and buyer, any other person who executes the Complete order will receive a reward of 3% of the Box's sale price. If the minter or buyer performs this action, there will be no fee incurred, meaning it will be counted as part of the minter's rewards.
            </p>
            
            <h3>
                5,Minter Rewards Rate:
            </h3>
            <p>

                As the most important role, the minter can receive the majority of the rewards to incentivize them to be more proactive in uploading criminal evidence to the Truth Market.
            </p>
            
            <h2>
                Regarding full refunds:
            </h2>
            <p>
                
                1. If a buyer purchases a Box and within 100 days, the minter or DAO has not executed Delivery, the buyer can obtain permission for a refund and receive a full refund.
                <br />
                2. When a buyer applies for a refund and receives approval, they can obtain a full refund.
                <br />
                3. When the Truth Box is blacklisted by the DAO community, the buyer will automatically be granted permission for a refund during the transaction and can receive a full refund.
                
            </p>
            <p>

                Note: All rewards will only be effective if the transaction is completed. If the buyer obtains a refund, it will mean that all other reward amounts associated with this transaction will also be reset to zero.
            </p>
            
            <h2>
                About Confidentiality Fee Allocation:
            </h2>
            <p>
                After the transaction is completed, the buyer can choose to add a confidentiality fee, of which 5% will be allocated to the DAO, 5% will be accounted for as a reward for the public Box, and the remaining 90% will be awarded to the minter.
            </p>
            <span className={styles.imageOne}>
                <img src={feeRate} alt="" />
            </span>
            <p>
                Through this fee structure, Truth Market is able not only to manage and circulate funds effectively, but also to incentivize participants on the platform, fostering a positive trading environment and encouraging long-term user engagement. We believe that setting reasonable fees and revenue mechanisms will provide a solid foundation for the sustainable development of the platform.
            </p>

        </div>
    )
}

export default RewardsFee;