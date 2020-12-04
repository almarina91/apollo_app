import React, {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
//import states
import {currentTime, playPressed, intervalTitle, playEnabled, playPauseEnabled, restartEnabled} from "./ItemsListSlice";
import './styles.css';
//import actions
import {play, pause, restart, tickTimer, nextInterval} from "./ItemsListSlice";
//import sound and useSound hook
import useSound from 'use-sound';
import workout_countdown_haptic from '../app/workout_countdown_haptic.aac';


const Timer = () => {
    //get dispatch
    const dispatch = useDispatch();
    //get the current states
    const timeLeft = useSelector(currentTime);
    const formattedTime = new Date(1000 * timeLeft).toISOString().substr(14, 5);
    const playPressedLocal = useSelector(playPressed);
    const title = useSelector(intervalTitle);
    const playButtonEnabled = useSelector(playEnabled);
    const playPauseButtonEnabled = useSelector(playPauseEnabled);
    const restartButtonEnabled = useSelector(restartEnabled);
    // get the sound
    const [playOn] = useSound(workout_countdown_haptic, {volume: 0.5})

    useEffect(() => {
        if (!playPressedLocal) {
            return;
        }
        if (timeLeft === 3) {
            playOn();
        }
        if (timeLeft > 0) {
            setTimeout(() => {
                dispatch(tickTimer())
            }, 1000)}
        else {
            dispatch(nextInterval())
        }
    },[timeLeft, playPressedLocal]);
    return(
        <div>
            <span className="title">{title}</span>
            <br/>
            <span className="time">{formattedTime}</span>
            <br/>
            <div className="buttons-div">
                {playButtonEnabled ?
                    <button onClick={()=>dispatch(play())} className="button">▷</button> :
                    <button className="disabled-button">▷</button>}
                {playPauseButtonEnabled?
                    <button onClick={() => dispatch(pause())} className="button">{playPressedLocal ? "❚❚" : "▷❚❚"}</button> :
                    <button className="disabled-button">❚❚</button>}
                {restartButtonEnabled?
                    <button onClick={() => dispatch(restart())} className="button"><strong>⟲</strong></button>:
                    <button className="disabled-button"><strong>⟲</strong></button>}
            </div>
        </div>
    )
}

export default Timer;