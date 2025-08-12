import EyeDropSVG from "../svg/EyeDropSVG";
import { useColor } from "../../constants/ColorProvider";

const EyeDropButton = () => {
    const { theme } = useColor();

    return (
        <button type="button" className={`cursor-pointer rounded-md p-0.5 ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'} transition-colors duration-200`}>
            <EyeDropSVG width="18px" height="18px" color={theme === 'light' ? "#464455" : "var(--color-dark-text)"} />
        </button>
    )
}

export default EyeDropButton;