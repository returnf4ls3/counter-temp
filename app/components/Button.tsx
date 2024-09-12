'use client';

import { getContrastYIQ, lightenColor } from "../actions/getColor";
import useSettings from "../hooks/useSettings";

interface ButtonProps {
    label: string;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}

const Button = ({ label, onClick, disabled, className }: ButtonProps) => {
    const primaryColor = useSettings((state) => state.primaryColor);
    const hoverColor = lightenColor(primaryColor, -10);
    const textColor = getContrastYIQ(primaryColor);

    return (
        <button className={`px-4 h-10 text-xl text-neutral-100 rounded-lg transition ${className}`}
            onClick={onClick}
            disabled={disabled}
            style={{
                backgroundColor: primaryColor,
                color: textColor,
            }}
            onMouseOver={e => {
                if (!disabled) e.currentTarget.style.backgroundColor = hoverColor;
            }}
            onMouseOut={e => {
                if (!disabled) e.currentTarget.style.backgroundColor = primaryColor;
            }}
        >
            {label}
        </button>
    );
}
 
export default Button;