import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import { useLocation } from 'react-router-dom';
import { ActiveRoute } from './script_nav';

export default function Navbar(){
    const {pathname}=useLocation();
    useEffect(()=>{
       if(pathname=='/'){
        console.log(document.querySelector(".uploadnav").classList.add("active"))
        // console.log(document.querySelector(".downloadnav").classList.add("inactive"))
        console.log(document.querySelector(".downloadnav").classList.remove("active"))
    }
    else{
        // console.log(document.querySelector(".downloadnav"))
        console.log(document.querySelector(".downloadnav").classList.add("active"))
        // console.log(document.querySelector(".uploadnav").classList.add("inactive"))
        console.log(document.querySelector(".uploadnav").classList.remove("active"))

       }
        },[pathname])
    return(
        <div className='navbar'>
        <div className="Logo">
        OneDrop
        </div>
        <Link to='/'>
        <div className='Navbutton uploadnav'>
        <span >Upload</span>
        </div>
        </Link>
        <Link to='/download' >
        <div className='Navbutton downloadnav'>
        <span className='downloadnav'>Download</span>
        
        </div>
        </Link>

        </div>
    )
}