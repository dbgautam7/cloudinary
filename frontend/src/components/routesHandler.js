import React from 'react'
import { Routes, Route } from "react-router-dom"
import UploadImageFromReactNode from './uploadImageFromReactNode'
import UploadImageFromReactOnly from './uploadImageFromReactOnly'

const RoutesHandler = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<UploadImageFromReactNode />} />
                <Route exact path="/uploadImageFromReactOnly" element={<UploadImageFromReactOnly />} />
            </Routes>
        </div>
    )
}

export default RoutesHandler