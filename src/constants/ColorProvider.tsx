import { createContext, useContext, useState, useEffect } from "react";
import type { RGB, HEX } from "../types/color";
import { randomizeColor, normalizeToRgb, getLuminance } from "../utils/colorUtils";

type Theme = 'light' | 'dark';

interface ColorContextType {
    color: RGB;
    setColor: (color: RGB | HEX) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const useColor = () => {
    const context = useContext(ColorContext);
    if (!context) {
        throw new Error("useColor must be used within a ColorProvider");
    }
    return context;
}

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
    // ===============================================
    // State
    // ===============================================
    const [theme, setTheme] = useState<Theme>('light');
    const [color, setColor] = useState<RGB>(() => {
        const initialColor = randomizeColor();
        return normalizeToRgb(initialColor);
    });

    // ===============================================
    // Effects
    // ===============================================
    /**
     * Automatically update theme when color changes based on luminance
     */
    useEffect(() => {
        const luminance = getLuminance(color);
        const newTheme: Theme = luminance > 0.5 ? 'light' : 'dark';
        setTheme(newTheme);
    }, [color]);

    // ===============================================
    // Handlers
    // ===============================================
    /**
     * Set the color
     * @param newColor - The new color to set
     */
    const handleSetColor = (newColor: RGB | HEX) => {
        setColor(normalizeToRgb(newColor));
    };

    /**
     * Set the theme manually (overrides automatic theme switching)
     * @param newTheme - The new theme to set
     */
    const handleSetTheme = (newTheme: Theme) => {
        setTheme(newTheme);
    };

    return (
        <ColorContext.Provider value={{
            color,
            setColor: handleSetColor,
            theme,
            setTheme: handleSetTheme,
        }}>
            {children}
        </ColorContext.Provider>
    )
}