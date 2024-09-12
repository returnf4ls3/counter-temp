'use client';

import { useEffect } from "react";
import { getContrastYIQ } from "../actions/getColor";
import Button from "../components/Button";
import useSettings from "../hooks/useSettings";

export default function SettingsPage() {
    const { toggleDarkMode, setPrimaryColor } = useSettings();
    const darkMode = useSettings((state) => state.darkMode);
    const primaryColor = useSettings((state) => state.primaryColor);

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [darkMode]);

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrimaryColor(event.target.value);
    };

    return (
        <div className="flex flex-col justify-center text-center items-center min-h-screen gap-8 dark:text-white">
            <h1 className="text-4xl">Settings</h1>
            <div className="flex flex-col justify-between items-center gap-2">
                <div className="mb-4">
                    <span className="mr-2">Dark Mode:</span>
                    <Button label={darkMode ? 'Disable' : 'Enable'} onClick={toggleDarkMode} />
                </div>
                <div className="mb-4">
                    <span className="mr-2">Primary Color:</span>
                    <input
                        type="color"
                        value={primaryColor}
                        onChange={handleColorChange} 
                        className="border-2 border-neutral-400 rounded" 
                    />
                </div>
            </div>
        </div>
    );
}