import React,{useState,useEffect} from 'react';
import { downloadModule } from '../helper/download';
import './download.css'



export default function Download(){

  
    const [code,setCode]=useState("")
    return(
        <div className='download'>
        <div className='first'>
        <div className='first-inner'>
        <div className='codeFeild'>

        <input onChange={(e)=>{
          setCode(e.target.value);
        }} className='codeinput' maxLength={5} placeholder='enter the code'></input>
          </div>

        
        <button className='downloadButton' onClick={async (e)=>{
          console.log(code)
          if(!downloadModule(code)){
            console.log("Hello")
            
          }
        }
        
      }>Download</button>
      <span className='nofile' style={{"display":"none", color:"red"}}>*this file doest not exist </span>
      </div>
      </div>
            </div>
    )
}