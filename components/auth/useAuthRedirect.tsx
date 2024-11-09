import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuthRedirect = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token');
      
      if (!savedToken) {
        router.replace('/login'); 
      } else {
        setIsLoading(false);
      }
    }
  }, [router]);

  return isLoading;
};

export default useAuthRedirect;
