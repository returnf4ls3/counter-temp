'use client';

import { IconType } from "react-icons";
import useSettings from "../hooks/useSettings";

interface IconButtonProps {
    icon: IconType;
    onClick: () => void;
    className?: string;
}

export const IconButton = ({ icon: Icon, onClick, className }: IconButtonProps) => {
    const darkMode = useSettings((state) => state.darkMode);

    return ( 
        <button onClick={onClick}>
            {Icon && (
                <Icon
                    size={34}
                    color={darkMode ? 'white' : 'black'}
                    className={`relative ${className}`}
                />
            )}
        </button>
    );
}