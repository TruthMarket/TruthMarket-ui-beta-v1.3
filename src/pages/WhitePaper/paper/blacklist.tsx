
// import React from 'react'
import styles from './styles.module.scss'
// import imageToken from '@assets/whitepaper/token.jpg'

function BlackList() {
    return (
        <div className={styles.navr}>
            <h1 className={styles.title}>Blacklist Mechanism</h1>
            <p>
                To ensure the trading environment and integrity of Truth Market, we have established a blacklist mechanism:
            </p>

            {/* <span className={styles.imageOne}>
                <img src={imageToken} alt="" />
            </span> */}

            <p>
                Truth Box Blacklist Management: If a particular Truth Box is placed on the blacklist, that Box will be unavailable for operation. If a buyer purchases the blacklisted Box, an automatic refund will be processed to protect the buyer’s rights. This mechanism ensures that bad behavior does not affect the overall ecosystem of the platform and provides a legitimate channel for recourse.
            </p>

            <p>
                Through this mechanism, Truth Market provides users with a safe and fair trading environment, laying the foundation for long-term collaboration and trust. We believe that effective deterrence of unlawful behavior and the maintenance of legal and social justice can only be achieved through transparent management.
            </p>
            <h3>
                Rules for Adding to the Blacklist:
            </h3>
            <p>
                1. Personal Privacy Protection: No personal privacy information may be involved; individual privacy rights must be respected.
                <br />
                2. Military Information Restrictions: No military-related information may be involved.
                <br />
                3. Protection of Commercial Information: No legitimate commercial information, including patented technology, may be involved.
                <br />
                4. Irrelevant to Crime: No information related to crime may be included.
                <br />
                5. Information Consistency: Titles or descriptions must be consistent with the content information.
                <br />
                6. Prevention of Duplicate Minting: Effective Truth Box from completed transactions must not be minted again.
                <br />
                7. Prohibition of False Information: No false identities or misleading content that has been forged or altered may be disseminated.
                <br />
                8. Illegal Content Restrictions: No form of illegal activities, such as drug trafficking or gambling, may be involved.
                <br />
                9. Prohibition of Malware Dissemination: No malware, viruses, or other content that harms systems may be spread.
                <br />
                10. Harassment and Discrimination Prohibition: No form of harassment, offensive language, or discriminatory content may be included.
                <br />
                11. Fraud Prohibition: No type of fraudulent activities may be involved, ensuring legitimate transactions.
                <br />
                12. Spam Content Restrictions: No duplicated content or worthless advertising information may be included.
                <br />
                13. Prohibition of Inappropriate Content: No obscene, vulgar, or threatening language and images may be included.
            </p>
            <p>
                We will continue to improve the blacklist rules. If you have any good suggestions, feel free to participate in our community.
            </p>


        </div>
    )
}

export default BlackList;