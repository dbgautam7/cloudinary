import { createContext, useContext, useState } from "react";

export const AppStateContext = createContext();

export function AppProvider({ children }) {
  const value = useState({});
  console.log(value, "value");
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  console.log(context, "context");
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}
