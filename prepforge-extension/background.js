// ✅ Handle internal extension messages (e.g., from popup)
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log("Received internal message:", msg);
    console.log("From sender (internal):", sender);

    if (msg.action === "send_leetcode_token") {
        chrome.cookies.get({ url: "https://leetcode.com", name: "LEETCODE_SESSION" }, (cookie) => {
            if (!cookie) {
                console.warn("LEETCODE_SESSION not found.");
                sendResponse({ success: false });
                return;
            }

            const sessionToken = cookie.value;
            console.log("🍪 LEETCODE_SESSION token:", sessionToken);

            chrome.storage.local.get(["prepforge_jwt"], (result) => {
                const jwt = result.prepforge_jwt;
                if (!jwt) {
                    console.warn("JWT not found in local storage");
                    sendResponse({ success: false });
                    return;
                }

                console.log(jwt);

                fetch("https://api.prepforge.space/api/v1/leetcode/session-token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + jwt
                    },
                    body: JSON.stringify({ token: sessionToken })
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("Token sent:", data);
                        sendResponse({ success: true });
                    })
                    .catch((err) => {
                        console.error("Error sending token:", err);
                        sendResponse({ success: false });
                    });
            });
        });

        return true; // 👈 Keep async response open
    }
});

// ✅ Handle messages from external web apps (e.g., your React dashboard)
chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
    console.log("Received EXTERNAL message:", msg);
    console.log("From external sender:", sender);

    if (msg.action === "store_jwt" && msg.jwt) {
        console.log("Storing JWT from external sender...");

        chrome.storage.local.set({ prepforge_jwt: msg.jwt }, () => {
            console.log("JWT stored in chrome.storage");
            sendResponse({ success: true });
        });

        return true; // Required for async response
    }

    sendResponse({ success: false, error: "Invalid external message" });
});

// 🚀 Lifecycle logs
chrome.runtime.onStartup.addListener(() => {
    console.log("🚀 Extension started");
});

chrome.runtime.onInstalled.addListener(() => {
    console.log("📦 Extension installed");
});
