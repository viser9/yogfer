import { useEffect } from 'react';

const useClearLocalStorageOnExit = () => {
  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== 'undefined') {
      const handleBeforeUnload = () => {
        localStorage.clear();
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, []);
};

export default useClearLocalStorageOnExit;
