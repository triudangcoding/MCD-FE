import React, { createContext, useContext, useState, useEffect } from 'react';
import { Preloader } from '@/components/global/preloader';

interface PreloaderContextType {
  showPreloader: (duration?: number) => void;
  hidePreloader: () => void;
  forceHide: () => void;
  isVisible: boolean;
  isFirstLoad: boolean;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export const usePreloader = () => {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error('usePreloader must be used within a PreloaderProvider');
  }
  return context;
};

interface PreloaderProviderProps {
  children: React.ReactNode;
}

export const PreloaderProvider: React.FC<PreloaderProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Check if this is the first load of the website
  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('app_loaded');
    if (hasLoadedBefore) {
      setIsFirstLoad(false);
    } else {
      sessionStorage.setItem('app_loaded', 'true');
      setIsFirstLoad(true);
      // Tự động hiển thị preloader khi lần đầu vào web
      setIsVisible(true);
      
      // Tự động ẩn preloader sau 1.5 giây nếu không có page nào handle
      const autoHideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
      
      setHideTimeout(autoHideTimeout);
    }
  }, []);

  const showPreloader = (duration?: number) => {
    // Chỉ hiển thị preloader nếu là lần đầu vào web
    if (!isFirstLoad) return;
    
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setIsVisible(true);
    
    if (duration) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      setHideTimeout(timeout);
    }
  };

  const hidePreloader = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setIsVisible(false);
  };

  const forceHide = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  return (
    <PreloaderContext.Provider value={{ showPreloader, hidePreloader, forceHide, isVisible, isFirstLoad }}>
      {children}
      <Preloader isVisible={isVisible} />
    </PreloaderContext.Provider>
  );
}; 