import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const UploadImageFromReactNode = () => {

    const [image, setImage] = useState("");
    const uploadImage = async () => {
        const formData = new FormData()
        formData.append("image", image)

        await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
            method: "POST",
            body: formData
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data, "data")
                setImage(data.url)
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <Link to="/">Back to Home</Link>
            <div>
                <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
                <button onClick={uploadImage}>Upload</button>
            </div>
            <div>
                <h1>Uploaded image will be displayed here</h1>
                <img src={`${image}? w=400 & h=300`} alt="img" />
            </div>
        </div>
    )
}

export default UploadImageFromReactNode