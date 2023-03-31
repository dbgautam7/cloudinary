import React from 'react'
import { Routes, Route } from "react-router-dom"
import Clock from './alarmClock/clock'
import FeaturesList from './featuresList'
import Parent from './props/parent'
import UploadImageFromReactNode from './uploadImageFromReactNode'
import UploadImageFromReactOnly from './uploadImageFromReactOnly'
import UseMemoHook from './useMemoHook'
import UseRefHook from './useRefHook'

const RoutesHandler = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<FeaturesList />} />
                <Route exact path="/uploadImageFromReactOnly" element={<UploadImageFromReactOnly />} />
                <Route exact path="/uploadImageFromReactNode" element={<UploadImageFromReactNode />} />
                <Route exact path="/propsHandling" element={<Parent />} />
                <Route exact path="/clock" element={<Clock />} />
                <Route exact path="/useRefHook" element={<UseRefHook />} />
                <Route exact path="/useMemoHook" element={<UseMemoHook />} />
            </Routes>
        </div>
    )
}

export default RoutesHandler