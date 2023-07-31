import React, { useState } from "react";

const steps = [
  {
    label: "Address",
    step: 1,
  },
  {
    label: "Shipping",
    step: 2,
  },
  {
    label: "Payment",
    step: 3,
  },
  {
    label: "Summary",
    step: 4,
  },
];

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(1);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const totalSteps = steps.length;

  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

  const mainContainerStyle = {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "0 16px",
  };

  const stepContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "70px",
    position: "relative",
  };

  const beforeStyle = {
    content: "",
    position: "absolute",
    background: "#f3e7f3",
    height: "4px",
    width: "100%",
    top: "50%",
    transform: "translateY(-50%)",
    left: "0",
  };

  const afterStyle = {
    content: "",
    position: "absolute",
    background: "#4a154b",
    height: "4px",
    width: width,
    top: "50%",
    transition: "0.4s ease",
    transform: "translateY(-50%)",
    left: "0",
  };

  const stepWrapperStyle = {
    position: "relative",
    zIndex: "1",
  };

  const stepStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    transition: "0.4s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const stepCountStyle = {
    fontSize: "19px",
    color: "#f3e7f3",
  };

  const stepLabelContainerStyle = {
    position: "absolute",
    top: "66px",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const stepLabelStyle = {
    fontSize: "19px",
    color: "#4a154b",
  };

  const buttonsContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 -15px",
    marginTop: "100px",
  };

  const buttonStyle = {
    borderRadius: "4px",
    border: "0",
    background: "#4a154b",
    color: "#ffffff",
    cursor: "pointer",
    padding: "8px",
    width: "90px",
  };

  const checkMarkStyle = {
    fontSize: "26px",
    fontWeight: "600",
    color: "#4a154b",
    msTransform: "scaleX(-1) rotate(-46deg)",
    webkitTransform: "scaleX(-1) rotate(-46deg)",
    transform: "scaleX(-1) rotate(-46deg)",
  };

  return (
    <div style={mainContainerStyle}>
      <div style={stepContainerStyle}>
        <div style={beforeStyle}></div>
        <div style={afterStyle}></div>
        {steps.map(({ step, label }) => (
          <div key={step} style={stepWrapperStyle}>
            <div
              style={{
                ...stepStyle,
                border: `3px solid ${
                  activeStep >= step ? "#4A154B" : "#F3E7F3"
                }`,
              }}
            >
              {activeStep > step ? (
                <div style={checkMarkStyle}>L</div>
              ) : (
                <span style={stepCountStyle}>{step}</span>
              )}
            </div>
            <div style={stepLabelContainerStyle}>
              <span style={stepLabelStyle}>{label}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={buttonsContainerStyle}>
        <button
          style={buttonStyle}
          onClick={prevStep}
          disabled={activeStep === 1}
        >
          Previous
        </button>
        <button
          style={buttonStyle}
          onClick={nextStep}
          disabled={activeStep === totalSteps}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;
