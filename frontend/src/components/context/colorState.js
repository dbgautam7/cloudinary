import ColorContext from "./colorContext";

const ColorState = (props) => {
  const state = {
    backgroundColor: "green",
    color: "red",
  };

  return (
    <ColorContext.Provider value={state}>
      {props.children}
    </ColorContext.Provider>
  );
};

export default ColorState;
