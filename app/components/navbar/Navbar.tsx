'use client';

import { useRouter } from "next/navigation";
import Container from "../Container";
import { IconButton } from "../IconButton";
import { MdHome, MdSettings, MdOutlineLogin, MdOutlineLogout, MdSpaceDashboard, MdDashboard } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const router = useRouter();
    const { data: session } = useSession();

    return (
        <div className="fixed w-full z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <div className="flex flex-row items-center justify-between px-4">
                    <div className="flex flex-row gap-8">
                        <IconButton icon={MdHome} onClick={() => router.push('/')} />
                        <IconButton icon={MdSettings} onClick={() => router.push('/settings')} />
                    </div>
                    <div className="flex flex-row gap-8 ml-auto">
                        {session ? 
                        (<>
                            <IconButton icon={MdDashboard} onClick={() => router.push('/dashboard')} />
                            <IconButton icon={MdOutlineLogout} onClick={() => signOut()} />
                        </>)
                        :
                        <IconButton icon={MdOutlineLogin} onClick={() => router.push('/login')} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;