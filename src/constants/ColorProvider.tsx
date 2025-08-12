import { createContext, useContext, useState } from "react";
import type { RGB, HEX } from "../types/color";
import { randomizeColor, normalizeToRgb } from "../utils/colorUtils";

interface ColorContextType {
    color: RGB;
    setColor: (color: RGB | HEX) => void;
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
    const [color, setColor] = useState<RGB>(() => {
        const initialColor = randomizeColor();
        return normalizeToRgb(initialColor);
    });

    const handleSetColor = (newColor: RGB | HEX) => {
        setColor(normalizeToRgb(newColor));
    };

    return (
        <ColorContext.Provider value={{
            color,
            setColor: handleSetColor,
        }}>
            {children}
        </ColorContext.Provider>
    )
}