import React from 'react'
import { Routes, Route } from "react-router-dom"
import Clock from './alarmClock/clock'
import DynamicRouting from './dynamicRouting/dynamicRouting'
import FeaturesList from './featuresList'
import CustomInfiniteScroll from './infiniteScroll/customInfiniteScroll'
import InfiniteScrolling from './infiniteScroll/infiniteScrolling'
import Parent from './props/parent'
import UploadImageFromReactNode from './uploadImageFromReactNode'
import UploadImageFromReactOnly from './uploadImageFromReactOnly'
import UseMemoHook from './useMemoHook'
import UseRefHook from './useRefHook'
import MotionJs from './motion/motion'

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
                <Route exact path="/dynamicRouting/:category/:id" element={<DynamicRouting />} />
                <Route exact path="/infiniteScrolling" element={<InfiniteScrolling />} />
                <Route exact path="/customInfiniteScroll" element={<CustomInfiniteScroll />} />
                <Route exact path="/motion" element={<MotionJs />} />
            </Routes>
        </div>
    )
}

export default RoutesHandler