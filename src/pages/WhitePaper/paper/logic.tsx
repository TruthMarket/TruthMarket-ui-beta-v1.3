
// import React from 'react'
import styles from './styles.module.scss'
import roles from '@assets/whitepaper/roles.jpg'
import people from '@assets/whitepaper/people.jpg'
import criminal from '@assets/whitepaper/criminal.jpg'
import criminal2 from '@assets/whitepaper/criminal2.jpg'

function Logic() {
    return (
        <div className={styles.navr}>
            <h1 className={styles.title}>Underlying Logic of the Truth Market</h1>

            <p>
                For any product to succeed, it requires human involvement. Each participant plays a different role, making the operation of the product possible.
            </p>
            <span className={styles.imageOne}>
                <img src={roles} alt="" />
            </span>
            <span className={styles.imageOne}>
                <img src={people} alt="" />
            </span>
            <h3>
                1, Fear, Justice, and Conscience:
            </h3>
            <p>
                When confronted with evil, those in the know often experience significant fear and internal moral struggle. While fear may suppress the courage to express the truth, a sense of justice can motivate them to stand against wrongdoing. We strive to encourage this courage through the Truth Market, helping informants to speak out.
            </p>
            <h3>
                2, Anonymity and Security Assurance:
            </h3>
            <p>
                Although many countries have systems for reporting crime, absolute confidentiality is often unattainable, putting whistleblowers at risk of retaliation. Many people suffer greatly for exposing the truth. The Truth Market leverages Web 3.0 technology to provide anonymity, ensuring that the identities of informants are completely secure, thereby alleviating their concerns.
            </p>
            <h3>
                3, Incentives and Motivational Rewards:
            </h3>
            <p>
                Many countries have reward policies for whistleblowers, demonstrating societal value placed on truth and justice. The Truth Market not only offers users substantial financial benefits but also aims to provide funding support to judicial departments, police, and other safety agencies. Establishing a reasonable incentive model is essential for encouraging more people to boldly pursue justice.
            </p>
            <h3>
                4, Desire for Justice and Social Reality:
            </h3>
            <p>
                The vast majority of people yearn for justice, but the infiltration of evil forces in society often causes many well-intentioned individuals to act with caution, leading to compromise. The Truth Market aims to provide a safe environment for these individuals, helping them overcome fear and courageously pursue the truth.
            </p>
            <h3>
                5, The Powerful Force of Truth:
            </h3>
            <p>
                Truth is the strongest weapon; the cost of concealing wrongdoing often exposes its vulnerabilities. No matter how much power a criminal possesses, once the truth is made public, the law will inevitably pursue responsibility, ensuring that justice is served.
            </p>
            {/* <span className={styles.imageTwo}>
                <img className={styles.imageTwo01} src={roles} alt="" />
                <img className={styles.imageTwo01} src={roles} alt="" />
            </span> */}
            <span className={styles.imageOne}>
                <img src={criminal} alt="" />
            </span>

            <h3>
                6, Internal Struggles Among Criminals:
            </h3>
            <p>
                Within criminal organizations, there is often a lack of trust among members, and varying degrees of crime lead to suspicion and betrayal. As the weaker party, accomplices may retain evidence for self-preservation. The Truth Market provides a secure storage platform for this evidence, ensuring anonymity and immutability, thus offering a hidden lifeline for those with knowledge.
            </p>
            <h3>
                7, Fragility of Criminal Psychology:
            </h3>
            <p>
                Criminal behavior can lead to significant psychological changes in offenders. Faced with the threat of legal consequences, they may seriously doubt their own perceptions of events. The fear of legal penalties drives them to adopt extreme measures to cover up the truth. The Truth Market capitalizes on this psychology, making its value even more significant.
            </p>
            <span className={styles.imageOne}>
                <img src={criminal2} alt="" />
            </span>
            
        </div>
    )
}

export default Logic;