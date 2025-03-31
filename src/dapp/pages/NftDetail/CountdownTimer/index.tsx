import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
//导入assets中的图片

interface Props {
    time:number;
}

const CountdownTimer: React.FC<Props> = ({ time }) => {
    // console.log('deadline：',time);
    const [over, setOver] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState(() => {
        const { timeLeft } = calculateTimeLeft();
        return timeLeft;
    });
    
    function calculateTimeLeft() {
        const currentTimestamp = Math.floor(Date.now()/1000);
        // console.log('currentTimestamp：',currentTimestamp);

        const difference = time- currentTimestamp;
        
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (60 * 60 * 24)),
                hours: Math.floor((difference / (60 * 60)) % 24),
                minutes: Math.floor((difference / 60) % 60),
                seconds: Math.floor(difference % 60),
            };
            return { timeLeft, overStatus: 'Countdown' };
        } else {
            return { timeLeft, overStatus: 'Countdown has ended' };
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const { timeLeft: newTimeLeft, overStatus } = calculateTimeLeft();
            setTimeLeft(newTimeLeft);
            setOver(overStatus);
        }, 1000);

        return () => clearInterval(timer);
    }, [time]);

    return (
        <div className={styles.secretTime}>
            <p className={styles.haveTime}>{over}</p>
            <div className={styles.showTime}>
                <span className={styles.time}>
                    <span className={styles.timeNumber}>{timeLeft.days}</span>
                    <p>D</p>
                </span>
                <span className={styles.time}>
                    <span className={styles.timeNumber}>{timeLeft.hours}</span>
                    <p>H</p>
                </span>
                <span className={styles.time}>
                    <span className={styles.timeNumber}>{timeLeft.minutes}</span>
                    <p>M</p>
                </span>
                <span className={styles.time}>
                    <span className={styles.timeNumber}>{timeLeft.seconds}</span>
                    <p>S</p>
                </span>
            </div>

        </div>
    );
}

export default CountdownTimer;
