import { useState,useEffect } from 'react'
import axios from 'axios';
import "./upload.css"
import logo from '../assets/logo.png'
import mascot from '../assets/capibara.gif'
import mascot2 from '../assets/mascot2.gif'
import { useLocation } from 'react-router-dom';
import Dialog from './dialog';

export default function Uploads() {
  const [file, setFile] = useState(null);
  const [value,setValue]=useState();
  const location =useLocation();
  // console.log(location)
  const currentPath = location.pathname;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    
  };

  const handleUpload = async () => {
    if(file){
      const formData = new FormData();
      formData.append('file', file);
      
    try {
      const response = await axios.post('http://localhost:3000/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(async (d)=>{
        setValue(d.data.label);
        
        document.querySelector('.fileName').textContent=d.data.label;
      }).catch((e)=>{
        // d.json()
        console.log(e);
        document.querySelector('.fileName').textContent="error in uploading"
      });
    } catch (error) {
      document.querySelector('.fileName').textContent="error in uploading"
      // console.error('Error uploading file', error);
    }

    // console.log(response.blobl)
  }
  };

  return (
    <div className='uploads'>
    {value?<Dialog value={value}/>:""}
    <div className='inputfile'>
    <label className='inputlabel' for="inputFile">
    <div className='uploadAnimation'>
    <img className='folderAnimation' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDJhZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFycm93LXVwLWZyb20tbGluZSI+PHBhdGggZD0ibTE4IDktNi02LTYgNiIvPjxwYXRoIGQ9Ik0xMiAzdjE0Ii8+PHBhdGggZD0iTTUgMjFoMTQiLz48L3N2Zz4="></img>
    </div>
    <input id="inputFile" type="file" onChange={handleFileChange} />
    </label>
    <p className='fileName'>{file?file.name:""}</p>
    <button className='uploadbtn' onClick={handleUpload}>Upload</button>
    </div>
    

    
    </div>
  )
}

