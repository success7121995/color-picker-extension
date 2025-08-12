import { useEffect } from "react";

interface TooltipProps {
    isVisible: boolean;
    onHide: () => void;
    autoHideDelay: number;
}

const Tooltip = ({ isVisible, onHide, autoHideDelay }: TooltipProps) => {

    // ===============================================
    // Handlers
    // ===============================================
    useEffect(() => {
        if (isVisible) {
            setTimeout(() => {
                onHide();
            }, autoHideDelay);
        }
    }, [isVisible, onHide, autoHideDelay]);

    // ===============================================
    // Render
    // ===============================================      
    return (
        <>
            {isVisible && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-50 px-3 py-2 rounded-lg shadow-lg border backdrop-blur-sm transition-all duration-300 ease-out bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                    <p className="text-4xs font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                        Copied to clipboard
                    </p>
                </div>
            )}
        </>
    );
};

export default Tooltip;