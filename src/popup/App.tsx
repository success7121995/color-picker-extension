import { useState } from 'react';

const App = () => {
    // ================================
    // State
    // ================================
    const [isCapturing, setIsCapturing] = useState(false);
    const [screenshot, setScreenshot] = useState<string | null>(null);

    const handleCapture = async () => {
        if (isCapturing) return; // Prevent multiple simultaneous calls
        
        setIsCapturing(true);
        try {
            const response = await chrome.runtime.sendMessage({ type: "CAPTURE_SCREEN" });
            console.log(response);

            if (response?.error) {
                console.error('Capture error:', response.error);
            } else if (response?.image) {
                console.log('Screenshot captured successfully');
                setScreenshot(response.image);
            }
        } catch (error) {
            console.error('Failed to capture screen:', error);
        } finally {
            setIsCapturing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center text-red-500">
                    Color Picker Extension
                </h1>
                
                <button 
                    onClick={handleCapture} 
                    disabled={isCapturing}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mb-4"
                >
                    {isCapturing ? 'Capturing...' : 'Capture Screen'}
                </button>
                
                {screenshot && (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Screenshot:</h2>
                        <img 
                            src={screenshot} 
                            alt="Screenshot" 
                            className="w-full rounded-lg border border-gray-200 shadow-sm"
                        />
                    </div>
                )}
            </div>
        </div>
    )
};

export default App;