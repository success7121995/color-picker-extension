import Palette from "./Palette";
import HEXSelector from "./HEXSelector";
import RGBASelector from "./RGBASelector";

const ColorPicker = () => {
    return (
        <div
            className="flex flex-col items-center justify-center py-4 rounded-lg"
            style={{
                backgroundColor: "#ffffff",
            }}
        >
            <Palette />
            <RGBASelector />
            <HEXSelector />
        </div>
    )
}

export default ColorPicker;