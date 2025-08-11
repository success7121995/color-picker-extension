import { createContext, useContext, useState } from "react";
import type { RGBA, HEX } from "../types/color";
import { randomizeColor } from "../utils/colorUtils";

interface ColorContextType {
    color: RGBA | HEX;
    setColor: (color: RGBA | HEX) => void;
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
    const [color, setColor] = useState<RGBA | HEX>(randomizeColor());

    return (
        <ColorContext.Provider value={{
            color,
            setColor,
        }}>
            {children}
        </ColorContext.Provider>
    )
}