import React from 'react';

export default function NewClock(props) {

    let hour = (props.hour * 30) - 90 + props.zone.zone * 30;
    let min = (props.min * 6) - 90;
    let sec = (props.sec * 6) - 90;

    return (
        <div>

            <p>{props.zone.city}</p>

            <div className='newClock-clock'>

                <hr className='hourArrow'
                    style={{ transform: `rotate(${hour}deg)` }}
                />

                <hr className='minArrow'
                    style={{ transform: `rotate(${min}deg)` }}
                />

                <hr className='secArrow'
                    style={{ transform: `rotate(${sec}deg)` }}
                />

                <div className='newClock-remove'
                    onClick={() => props.remove(props.zone.id)}>&otimes;</div>

            </div>
        </div>
    );
}