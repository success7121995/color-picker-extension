import { useState } from "react";
import { useColor } from "../../constants/ColorProvider";
import CopySVG from "../svg/CopySVG";
import Tooltip from "./Tooltip";

interface CopyButtonProps {
    onCopy: () => void;
}

const CopyButton = ({ onCopy }: CopyButtonProps) => {
    const { theme } = useColor();
    const [showTooltip, setShowTooltip] = useState(false);

    const handleCopy = async () => {
        try {
            onCopy();
            setShowTooltip(true);
        } catch (error) {
            console.error('Failed to copy text:', error);
        }
    };

    const hideTooltip = () => {
        setShowTooltip(false);
    };

    return (
        <div className="relative">
            <button 
                type="button" 
                className={`cursor-pointer rounded-md p-0.5 ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'} transition-colors duration-200`} 
                onClick={handleCopy}
            >
                <CopySVG 
                    height="20px" 
                    width="20px" 
                    color={theme === 'light' ? "var(--color-light-text)" : "var(--color-dark-text)"} 
                />
            </button>
            
            <Tooltip 
                isVisible={showTooltip} 
                onHide={hideTooltip}
                autoHideDelay={2000}
            />
        </div>
    );
};

export default CopyButton;