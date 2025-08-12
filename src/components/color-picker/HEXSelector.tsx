import { useColor } from "../../constants/ColorProvider";
import { rgbToHex } from "../../utils/colorUtils";
import { useState, useEffect } from "react";
import { CopyButton } from "../index";

const HEXSelector = () => {
    // ===============================================
    // State
    // ===============================================
    const { color, setColor, theme } = useColor();
    const [hexValue, setHexValue] = useState(rgbToHex(color));

    // ===============================================
    // Effects
    // ===============================================
    // Update hex input when color changes from palette or RGB inputs
    useEffect(() => {
        setHexValue(rgbToHex(color));
    }, [color]);

    // ===============================================
    // Handlers
    // ===============================================
    
    /**
     * Handle hex input changes
     * @param value - The hex value entered by user
     * @param e - The form event
     */
    const handleHexChange = (value: string) => {
        // Remove any existing # and spaces
        let cleanValue = value.replace(/[#\s]/g, '').toUpperCase();
        
        // Limit to 6 characters
        if (cleanValue.length > 6) {
            cleanValue = cleanValue.slice(0, 6);
        }
        
        // Only allow valid hex characters
        cleanValue = cleanValue.replace(/[^0-9A-F]/g, '');
        
        setHexValue(cleanValue);
        
        // Update color if we have a valid 6-character hex
        if (cleanValue.length === 6) {
            setColor(cleanValue);
        }
    };

    /**
     * Handle hex input blur - add # prefix if missing
     * @param e - The form event
     */
    const handleHexBlur = (e: React.FormEvent) => {
        e.preventDefault();

        if (hexValue.length === 6) {
            setColor(hexValue);
        }
    };

    /**
     * Handle form submission
     * @param e - The form event
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Ensure it's a valid 6-character hex
        if (hexValue.length === 6 && /^[0-9A-F]{6}$/i.test(hexValue)) {
            setColor(hexValue);
            setHexValue(hexValue);
        }
    };

    /**
     * Copy to clipboard
     */
    const copyToClipboard = () => {
        navigator.clipboard.writeText(hexValue);
    }

    // ===============================================
    // Render
    // ===============================================
    return (
        <form onSubmit={handleSubmit}>
            <div 
                className="relative flex flex-row justify-between items-center gap-1 mt-5 px-2 py-[7px] border rounded-md"
                style={{
                    backgroundColor: theme === 'light' ? "var(--color-light-background)" : "var(--color-dark-background)",
                    borderColor: theme === 'light' ? "var(--color-light-border)" : "var(--color-dark-border)",
                }}
            >
                {/* Label */}
                <label
                    htmlFor="hex"
                    className="absolute -top-2 left-3 text-xs font-medium px-1"
                    style={{
                        backgroundColor: theme === 'light' ? "var(--color-light-background)" : "var(--color-dark-background)",
                        color: theme === 'light' ? "var(--color-light-text)" : "var(--color-dark-text)",
                    }}
                >
                    HEX
                </label>

                {/* Input */}
                <div className="flex items-center">
                    <input
                        type="text"
                        id="hex"
                        value={hexValue}
                        onChange={(e) => handleHexChange(e.target.value)}
                        onBlur={handleHexBlur}
                        placeholder="000000"
                        maxLength={6}
                        className="text-xs w-32 px-1 uppercase outline-none focus-ring"
                        style={{
                            backgroundColor: 'transparent',
                            color: theme === 'light' ? "var(--color-light-text)" : "var(--color-dark-text)",
                        }}
                    />
                </div>

                {/* Copy SVG */}
                <CopyButton onCopy={copyToClipboard} />
            </div>
        </form>
    );
};

export default HEXSelector;