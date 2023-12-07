import React from 'react';
import Uploads from './uploads';
import Download from './download';
import { useLocation } from 'react-router-dom';
import './main.css'
import mascot from "../assets/mascot2.gif"

export default function Main(){
    const {pathname}=useLocation();
    
    return(
        <div className='mainPage'>
        <div
        className='first'>
        {pathname=='/'? <Uploads/>:<Download/>}
        </div>
        <div className='second'>
        </div>

        </div>
    )
}