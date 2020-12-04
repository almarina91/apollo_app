import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles.css';
import { changeToDaysList, changeToIntervalsList, timerDisplay, currentItems } from "./ItemsListSlice";
import Timer from './Timer';


const ItemsList = () => {
    //get the current state
    const items = useSelector(currentItems);
    const timer = useSelector(timerDisplay);

    //import dispatch
    const dispatch = useDispatch();
    //map the current state and return folowing
    const itemsList = items.map((item, index) => {
        if (item.name === "0 to 2K" || item.name === "0 to 5K" || item.name === "5K to 10K" || item.name === "Weight Loss: Level 1" || item.name === "Weight Loss: Level 2" || item.name === "Weight Loss: Level 3"){
            //this returns programs
            const name = " item subitem item-" + item.name.replace(/ /g, '').replace(/:/,'');
            return( <div className={name} onClick={() => dispatch(changeToDaysList(item))}>{item.name}</div> )
        } else if (item.name.startsWith("Week") ){
            //this returns program days
            const green = 175 - index*2;
            const blue = 122 - index;
            const newColor = `rgb(255,${green},${blue})`;
            return( <div className="item subitem" style={{backgroundColor: newColor}} onClick={() => dispatch(changeToIntervalsList(item))}>{item.name}</div> )
        } else {
            //this returns intervals
            const name = item.name;
            const newColor = () => name === 'run' ? `rgb(255,175,122)` : `rgb(184, 184, 184)`;
            const time = new Date(1000 * item.seconds).toISOString().substr(14, 5);
            return(
                <div className="intervals">
                    <span className="interval" style={{color: newColor()}}>{item.name}</span>
                    <span className="interval" style={{color: newColor()}}>{time}</span>
                </div>
            )
        }
    })
    return(
        <div>
            {timer !== false && <Timer />}
            {itemsList}
        </div>
    )
}

export default ItemsList;