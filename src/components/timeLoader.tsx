import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useDelay = () => {
  return new Promise((resolve:any) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
};

export default function LoadingComponent() {
  useEffect(() => {
    const redirectAfterDelay = async () => {
      await useDelay(); 
    };
    redirectAfterDelay();
  }, []);

  return <>Loading...</>;
}