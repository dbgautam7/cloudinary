import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './clock.css';

const Clock = () => {
    const [hour, setHour] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");

    useEffect(() => {
        const updateClock = () => {
            const date = new Date();

            const hh = date.getHours() * 30;
            const mm = date.getMinutes() * 6;
            const ss = date.getSeconds() * 6;

            setHour(`rotateZ(${hh + mm / 12}deg)`);
            setMinutes(`rotateZ(${mm}deg)`);
            setSeconds(`rotateZ(${ss}deg)`);
        };

        updateClock();
        const clockInterval = setInterval(updateClock, 1000);

        return () => clearInterval(clockInterval);
    }, []);

    return (
        <>
        <Link to="/">Back to Home</Link>
            <div className="clock">
                <div
                    className="hand hour-hand"
                    style={{ transform: hour }}
                ></div>
                <div
                    className="hand minute-hand"
                    style={{ transform: minutes }}
                ></div>
                <div
                    className="hand second-hand"
                    style={{ transform: seconds }}
                ></div>
                <div className="clock-face">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="number"
                            style={{ transform: `rotate(${(i + 1) * 30}deg)` }}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
            
        </>
    )
}

export default Clock;
