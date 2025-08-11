chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
    if (msg.type === "CAPTURE_SCREEN") {
        // Get the current active tab at the moment of capture
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs || tabs.length === 0) {
                sendResponse({ error: "No active tab found" });
                return;
            }
            
            const currentTab = tabs[0];
            if (!currentTab.id) {
                sendResponse({ error: "Invalid tab ID" });
                return;
            }
            
            // Capture immediately without additional checks
            chrome.tabs.captureVisibleTab(currentTab.windowId, { format: "png" }, (dataUrl) => {
                if (chrome.runtime.lastError) {
                    console.error('Capture error:', chrome.runtime.lastError);
                    sendResponse({ error: chrome.runtime.lastError.message || "Failed to capture tab" });
                    return;
                }
                
                if (dataUrl) {
                    sendResponse({ image: dataUrl });
                } else {
                    sendResponse({ error: "No image data received" });
                }
            });
        });
        return true; // Keep sendResponse async
    }
});