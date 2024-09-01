import React, { createContext, useContext, useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import Loading from '../../components/shared/Loading';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => {
    setIsLoading(true);
  };

  const dismissLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const onBackPress = () => {
      if (isLoading) {
        return true;
      }
      return false;
    };

    // Add event listener for the back button
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );

    // Cleanup the event listener when the component is unmounted or when isLoading changes
    return () => backHandler.remove();
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={{ showLoading, dismissLoading, isLoading }}>
      {children}
      {isLoading && <Loading />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  return useContext(LoadingContext);
};
