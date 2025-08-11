import ColorPicker from "../components";
import { useColor } from "../constants/ColorProvider";
import { colorToString } from "../utils/colorUtils";

const App = () => {
    const { color } = useColor();

    return (
        <div
            className="p-4 min-w-[300px] min-h-[300px]"
            style={{
                backgroundColor: colorToString(color),
            }}
        >
            <ColorPicker />
        </div>
    )
};

export default App;