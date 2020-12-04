import React from 'react';
import {activePage, back, backToHome, headerName} from "./ItemsListSlice";
import {useSelector, useDispatch} from "react-redux";
import './styles.css';

const Header = () => {
    const dispatch = useDispatch();
    const page = useSelector(activePage);
    const header = useSelector(headerName);
    const backButton = () => {
        if (page === 'days') {
            return <span className ="backButton" onClick={()=>dispatch(backToHome())}>◁</span>
        } else if (page === 'intervals') {
            return <span className ="backButton" onClick={()=>dispatch(back())}>◁</span>
        } else {
            return <></>
        }
    }
    return (
        <div className="header">
            {backButton()}
            <h1 className="main-title">{header}</h1>
        </div>
    )
}

export default Header;