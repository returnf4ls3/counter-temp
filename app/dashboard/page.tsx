'use client';

import { useEffect } from "react";
import useSettings from "../hooks/useSettings";
import { useSession } from "next-auth/react";
import Link from "next/link";

const DashboardPage = () => {
    const { data: session } = useSession();
    const darkMode = useSettings((state) => state.darkMode);

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      }, [darkMode]);

    if (!session) {
        return (
            <div className="flex justify-center items-center min-h-screen dark:bg-black dark:text-white">
                <div className='text-center'>
                    <h1 className='text-3xl font-bold'>403 - Forbidden</h1>
                    <p className='text-lg'>You don&apos;t have permission to access this page.</p>
                    <Link className='text-blue-500 hover:underline focus:text-blue-700' href="/">
                        Go back to home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen dark:bg-black dark:text-white">
            dashboard
        </div>
    );
}
 
export default DashboardPage;