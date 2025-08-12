import Palette from "./Palette";
import HEXSelector from "./HEXSelector";
import RGBASelector from "./RGBASelector";
import { useColor } from "../../constants/ColorProvider";
import EyeDropButton from "../ui/EyeDropButton";

const ColorPicker = () => {
    const { theme } = useColor();

    return (
        <div
            className="flex flex-col items-center justify-center py-4 rounded-lg relative overflow-hidden"
            style={{
                backgroundColor: theme === 'light' ? "var(--color-light-background)" : "var(--color-dark-background)"
            }}
        >
            <Palette />

            <div className="w-[75%] mx-auto text-end ">
                <EyeDropButton />
            </div>
            <RGBASelector />
            <HEXSelector />
        </div>
    )
}

export default ColorPicker;