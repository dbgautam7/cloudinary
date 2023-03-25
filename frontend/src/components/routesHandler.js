import React from 'react'
import { Routes, Route } from "react-router-dom"
import Clock from '../containers/alarmClock/clock'
import Parent from '../containers/props/parent'
import UploadImageFromReactNode from './uploadImageFromReactNode'
import UploadImageFromReactOnly from './uploadImageFromReactOnly'

const RoutesHandler = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<UploadImageFromReactNode />} />
                <Route exact path="/uploadImageFromReactOnly" element={<UploadImageFromReactOnly />} />
                <Route exact path="/props" element={<Parent />} />
                <Route exact path="/clock" element={<Clock />} />
            </Routes>
        </div>
    )
}

export default RoutesHandler