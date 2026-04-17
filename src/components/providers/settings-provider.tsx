'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Settings {
    arabicFont: 'amiri' | 'noto';
    arabicSize: number;
    translationSize: number;
}

const defaultSettings: Settings = {
    arabicFont: 'amiri',
    arabicSize: 28,
    translationSize: 18,
};

interface SettingsContextType {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<Settings>(defaultSettings);

    useEffect(() => {
        const saved = localStorage.getItem('quran-settings');
        if (saved) {
            setTimeout(() => {
                const parsed = JSON.parse(saved);
                setSettings(parsed);
                document.documentElement.style.setProperty('--arabic-font-size', `${parsed.arabicSize}px`);
                document.documentElement.style.setProperty('--translation-font-size', `${parsed.translationSize}px`);
            }, 0);
        }
    }, []);

    const updateSettings = (newSettings: Partial<Settings>) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        localStorage.setItem('quran-settings', JSON.stringify(updated));
        // Update CSS variables
        document.documentElement.style.setProperty('--arabic-font-size', `${updated.arabicSize}px`);
        document.documentElement.style.setProperty('--translation-font-size', `${updated.translationSize}px`);
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('useSettings must be used within SettingsProvider');
    return context;
};