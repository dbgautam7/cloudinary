import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import { Contact } from "./steps/contact";
import { Education } from "./steps/education";
import { About } from "./steps/about";
import { Confirm } from "./steps/confirm";
import { Stepper } from "./steps/stepper";
import { AppProvider } from "./state";

const FormRoutes = () => {
  return (
    <AppProvider>
      <Stepper />
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/education" element={<Education />} />
        <Route path="/about" element={<About />} />
        <Route path="/confirm" element={<Confirm />} />
      </Routes>
    </AppProvider>
  );
};

export default FormRoutes;
