'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PublicPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#1D942C]/30 border-t-[#1D942C] rounded-full animate-spin mx-auto mb-6"></div>
        <p className="text-xl font-medium text-gray-700">Redirecting...</p>
      </div>
    </div>
  );
} 