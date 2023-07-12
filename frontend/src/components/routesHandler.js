import React from "react";
import { Routes, Route } from "react-router-dom";
import Clock from "./alarmClock/clock";
import DynamicRouting from "./dynamicRouting/dynamicRouting";
import FeaturesList from "./featuresList";
import CustomInfiniteScroll from "./infiniteScroll/customInfiniteScroll";
import InfiniteScrolling from "./infiniteScroll/infiniteScrolling";
import Parent from "./props/parent";
import UploadImageFromReactNode from "./uploadImageFromReactNode";
import UploadImageFromReactOnly from "./uploadImageFromReactOnly";
import UseMemoHook from "./useMemoHook";
import UseRefHook from "./useRefHook";
import MotionJs from "./motion/motion";
import UploadAudio from "./uplaodFile/uploadAudio";
import ReactQuill from "./reactQuill";
import Email from "./email";
import GalliMap from "./galliMap";
import FormRoutes from "./reactHookForm/formRoutes";
import Stepper from "./stepper";
import DarkMode from "./darkMode";

const RoutesHandler = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<FeaturesList />} />
        <Route
          exact
          path="/uploadImageFromReactOnly"
          element={<UploadImageFromReactOnly />}
        />
        <Route
          exact
          path="/uploadImageFromReactNode"
          element={<UploadImageFromReactNode />}
        />
        <Route exact path="/propsHandling" element={<Parent />} />
        <Route exact path="/clock" element={<Clock />} />
        <Route exact path="/useRefHook" element={<UseRefHook />} />
        <Route exact path="/useMemoHook" element={<UseMemoHook />} />
        <Route
          exact
          path="/dynamicRouting/:category/:id"
          element={<DynamicRouting />}
        />
        <Route
          exact
          path="/infiniteScrolling"
          element={<InfiniteScrolling />}
        />
        <Route
          exact
          path="/customInfiniteScroll"
          element={<CustomInfiniteScroll />}
        />
        <Route exact path="/motion" element={<MotionJs />} />
        <Route exact path="/reactQuill" element={<ReactQuill />} />
        <Route exact path="/reactEmailJS" element={<Email />} />
        <Route exact path="/galliMap" element={<GalliMap />} />
        <Route exact path="/reactHookForm/*" element={<FormRoutes />} />
        <Route exact path="/darkMode" element={<DarkMode />} />
        <Route exact path="/stepper" element={<Stepper />} />
      </Routes>
    </div>
  );
};

export default RoutesHandler;
