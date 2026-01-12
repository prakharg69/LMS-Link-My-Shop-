import { createContext, useContext, useState } from "react";

const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("stores");

  const value = {
    activeTab,
    setActiveTab
  };

  

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
