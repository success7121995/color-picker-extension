import { HexColorPicker } from "react-colorful";
import { useColor } from "../../constants/ColorProvider";
import { rgbToHex } from "../../utils/colorUtils";

const Palette = () => {
    // ===============================================
    // State
    // ===============================================
    const { color, setColor } = useColor();
    
    // ===============================================
    // Handlers
    // ===============================================
    // Convert RGB to HEX for the HexColorPicker
    const hexColor = rgbToHex(color);
    
    /**
     * Handle color changes from the palette
     * @param hexColor - The hex color to set
     */
    const handleColorChange = (hexColor: string) => {
        setColor(hexColor);
    };
    
    return (
        <div className="color-picker">
            <HexColorPicker
                color={hexColor}
                onChange={handleColorChange}
            />
        </div>
    )
}

export default Palette;