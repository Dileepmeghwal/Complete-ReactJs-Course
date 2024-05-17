import { createContext, useState, useContext } from 'react';

const RouterContext = createContext();

const RouterProvider = ({ children }) => {
  const [getValue, setValue] = useState(null);
  return <RouterContext.Provider value={{ getValue, setValue }}>{children}</RouterContext.Provider>;
};

const useGlobalContext = () => {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { RouterProvider, useGlobalContext };
