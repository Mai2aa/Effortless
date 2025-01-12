"use client"
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const useAuthRedirect = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      // Redirect to dashboard if signed in
      router.push('/dashboard');
    }
  }, [isSignedIn, router]);
};

export default useAuthRedirect;