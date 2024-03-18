'use client'
// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ImSpinner11 } from "react-icons/im";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/signup');
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="pt-8 flex flex-col text-black items-center justify-between bg-white">
      <p className='my-6'>You need to Signup/Login to move forward!!</p>
      <ImSpinner11 className='animate-spin'/>
      <p className='font-bold mt-6'>Redirecting you to Signup Page...</p>
    </main>
  );
}
