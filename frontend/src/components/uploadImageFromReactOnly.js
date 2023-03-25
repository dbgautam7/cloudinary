import React, { useState } from 'react'

const UploadImageFromReactOnly = () => {

    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const cloudName = process.env.REACT_APP_CLOUD_NAME
    // console.log(cloudName, "cloudName")

    const uploadImage = async() => {
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "dbgautam")
        formData.append("cloud_name", `${cloudName}`)
        formData.append("width", "400");
        formData.append("height", "300");

        await fetch(` https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "post",
            body: formData
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data, "data")
                setUrl(data.secure_url)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div>
                <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
                <button onClick={uploadImage}>Upload</button>
            </div>
            <div>
                <h1>Uploaded image will be displayed here</h1>
                <img src={`${url}? w=400 & h=300`} alt="img" />
            </div>
        </div>
    )
}

export default UploadImageFromReactOnly