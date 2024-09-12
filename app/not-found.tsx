'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import useSettings from './hooks/useSettings';

const Custom404 = () => {
    const darkMode = useSettings((state) => state.darkMode);

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [darkMode]); 

  return (
    <div className='flex justify-center items-center min-h-screen dark:bg-black dark:text-white'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold'>404 - Page Not Found</h1>
        <p className='text-lg'>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link className='text-blue-500 hover:underline focus:text-blue-700' href="/">
            Go back to home
        </Link>
      </div>
    </div>
  );
};

export default Custom404;