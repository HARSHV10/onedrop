import axios from "axios"; 


export const downloadModule=async (code)=>{
  console.log(code)
  let status=true;
    let fileType;
    const data =await fetch("https://onedrop-ez7c.onrender.com/download",{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Specify the content type if sending JSON data
    // Add other headers if needed
  },
  body: JSON.stringify({
    "code":code
  }), // Convert the data to JSON format
}).then((d)=>{
    console.log(d)
    return d.blob();
}).then((d)=>{
  console.log(d)
  if(status){

    return d;
  }
  else{
    return null;
  }
})
if(data){

  // console.log(data);
  // Create a Blob from the response data
  // Create a URL for the Blob
  const url = window.URL.createObjectURL(data);
  axios.get(url).then(d=>{
    if(d.data.msg=="file not found"){
     document.querySelector('.nofile').style.display="block"
    }
    else{
      const a = document.createElement("a");
      a.href=url;
      a.click(); 
      return false; 
    }
  })
  // Create a link element
  return true       
}
else {
  return false;
}
}
