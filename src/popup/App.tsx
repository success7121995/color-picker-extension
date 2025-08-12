import ColorPicker from "../components";
import { useColor } from "../constants/ColorProvider";
import { rgbaToString } from "../utils/colorUtils";

const App = () => {
    const { color } = useColor();

    return (
        <div
            className="p-4 min-w-[300px] min-h-[300px] transition-all duration-200"
            style={{
                backgroundColor: rgbaToString(color),
            }}
        >
            <ColorPicker />
        </div>
    )
};

export default App;