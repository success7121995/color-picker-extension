import { HexAlphaColorPicker } from "react-colorful";
import { useColor } from "../../constants/ColorProvider";
import { useEffect } from "react";
import { colorToString, randomizeColor } from "../../utils/colorUtils";

const Palette = () => {
    // ===============================================
    // State
    // ===============================================
    const { color, setColor } = useColor();

    // ===============================================
    // Effects
    // ===============================================

    // Randomize color on mount
    useEffect(() => {
        setColor(randomizeColor());
    }, []);
    

    return (
        <div className="color-picker">
            <HexAlphaColorPicker
                color={colorToString(color)}
                onChange={setColor}
            />
        </div>
    )
}

export default Palette;