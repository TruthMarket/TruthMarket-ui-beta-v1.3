// HomePage.tsx
// import React from 'react';
import styles from './styles.module.scss';
// import John from '../../assets/icon/2.svg';
import image01 from '../../assets/avatar/1.png';
import image02 from '../../assets/avatar/2.png';
import image03 from '../../assets/avatar/3.png';
// import image04 from '../../assets/avatar/4.png';
// import image05 from '../../assets/avatar/5.png';
import MemberCard from './memberCard';

function TeamPage() {
    const members = [
        {
            image: image01,
            name: 'He',
            position: 'Product management'
        },
        {
            image: image02,
            name: 'Wen',
            position: 'Developer'
        },
        {
            image: image03,
            name: 'Cai',
            position: 'Docs & More'
        }
    ];

    return (
        <div className={styles.team}>
            <div className={styles.container}>
                <div className={styles.text}>
                    <span>
                        <p className={styles.title}>About us</p>
                    </span>
                    <p className={styles.introduce}>
                        Several months ago, Wen and I had an in-depth conversation on Telegram, discussing the current state of the Web3 industry.

                        Unintentionally, we touched upon the serious topic of crime, ranging from the collapse of FTX to various insider activities on Wall Street,
                        and the numerous chaotic situations across different industries and countries worldwide. We lamented how it seems that bad people are continuously profiting,
                        while good people struggle to make a living.
                    </p>
                    <p className={styles.introduce}>
                        We felt a deep sense of disgust and anger towards this dire situation, which sparked our exploration of possible ways to change it.
                        Ultimately, in a joking way, we proposed the idea of creating a "Crime evidence (Truth) trading platform" that perfectly combines crime,
                        justice, and the advantages of Web3 token economics. This indeed sounded like a very meaningful work.
                    </p>
                    <p className={styles.introduce}>
                        We are an anonymous team distributed around the world, bringing together a group of young people who are serious, responsible, passionate and have a strong sense of justice.
                        In this era of rapid change, we deeply feel that the world today is facing many injustices and challenges, and emotions of anger and dissatisfaction are constantly stirring in our hearts.
                        We always firmly believe in the value of "truth is justice" and believe that revealing the truth is the prerequisite for pursuing justice and harmony.
                    </p>
                </div>

                <div className={styles.member}>
                    {members.map((member, index) => (
                        <MemberCard
                            key={index}
                            image={member.image}
                            name={member.name}
                            position={member.position}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TeamPage;