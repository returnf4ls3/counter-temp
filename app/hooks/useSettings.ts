import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsStore {
    darkMode: boolean;
    primaryColor: string;
    toggleDarkMode: () => void;
    setPrimaryColor: (color: string) => void;
    setSettings: (settings: Partial<SettingsStore>) => void;
}

const useSettings = create<SettingsStore>()(
    persist<SettingsStore>(
        (set) => ({
            darkMode: false,
            primaryColor: '#06b6d4',
            toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
            setPrimaryColor: (color) => set({ primaryColor: color }),
            setSettings: (settings) => set((state) => ({ ...state, ...settings })),
        }),
        {
            name: 'settings-storage',
        }
    )
);

export default useSettings;