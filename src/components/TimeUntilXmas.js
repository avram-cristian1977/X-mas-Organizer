
import { useState, useEffect } from 'react/cjs/react.development';
import './TimeUntilXmas.css'
import xmastree from '../assets/images/brad.png'
import snowman from '../assets/images/snowman.png'
import sleigh from '../assets/images/sleigh.png'

const TimeUntilXmas = () => {




    const [days, setDays] = useState()
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState()


    useEffect(() => {
        findDate()
        setInterval(() => {

            findDate()
        }, 1000);

    }, [])


    const findDate = () => {
        let currentTime = new Date()
        let christmasYear = currentTime.getFullYear()
        if (currentTime.getMonth() > 11 && currentTime.getDate() > 25) {
            christmasYear += 1
        }

        let xMasTime = new Date(christmasYear, 11, 25)
        let dateDifference = xMasTime - currentTime
        if (currentTime.getMonth() !== 11 || (currentTime.getMonth() === 11 && currentTime.getDate() !== 25)) {
            setDays(Math.floor(dateDifference / (1000 * 60 * 60 * 24)))
            setHours(Math.floor(dateDifference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)) )
            setMinutes(Math.floor(dateDifference % (1000 * 60 * 60) / (1000 * 60)))
            setSeconds(Math.floor(dateDifference % (1000 * 60) / (1000)))

        }

    }

    return <>
        <div className="xtreeWrapper">
            <img src={snowman} alt="snowman"  id="snowman"/>
            <h2 className="homeTitle">Time until X-mas</h2>
            <img src={xmastree} alt="xmastree" />
           <div className="giftClock">
               <div className="row1">
                        <div id="a1"><span id="seconds">{days}</span></div>
                        <div id="b1"><span id="minutes">{hours}</span></div>
               </div>
               <div className="row2">
                        <div id="a2"><span id="hours">{minutes}</span></div>
                        <div id="b2"><span id="days">{seconds}</span></div>
               </div>
           </div>
           <img src={sleigh} alt="sleigh" width="100" id="sleigh" />
        </div>
        <div className="horizontalLine"></div>

    </>
}

export default TimeUntilXmas;