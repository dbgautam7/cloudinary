import './App.css';
import React, { useState } from 'react'

const App = () => {

const [image, setImage ] = useState("");
const [ url, setUrl ] = useState("");
const cloudName=process.env.REACT_APP_CLOUD_NAME
console.log(cloudName,"cloudName")

const uploadImage = () => {
const data = new FormData()
data.append("file", image)
data.append("upload_preset", "dbgautam")
data.append("cloud_name","dui0erg4f")
fetch(` https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{
method:"post",
body: data
})
.then(resp => resp.json())
.then(data => {
setUrl(data.url)
})
.catch(err => console.log(err))
}
return (
<div>
<div>
<input type="file" onChange= {(e)=> setImage(e.target.files[0])}></input>
<button onClick={uploadImage}>Upload</button>
</div>
<div>
<h1>Uploaded image will be displayed here</h1>
<img src={url} alt="img" />
</div>
</div>
)
}
export default App;
