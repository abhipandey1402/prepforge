document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById("send");
    const statusDiv = document.getElementById("status");

    // Show JWT status
    chrome.storage.local.get(["prepforge_jwt"], (result) => {
        if (result.prepforge_jwt) {
            statusDiv.textContent = "JWT found";
        } else {
            statusDiv.textContent = "JWT missing Connect from Prepforge dashboard first.";
        }
    });

    sendBtn.addEventListener("click", () => {
        statusDiv.textContent = "Sending...";

        // 👉 Trigger the background script to send session token
        chrome.runtime.sendMessage({ action: "send_leetcode_token" }, (response) => {
            if (chrome.runtime.lastError) {
                statusDiv.textContent = "Error: " + chrome.runtime.lastError.message;
                return;
            }

            if (response?.success) {
                statusDiv.textContent = "Token sent successfully!";
            } else {
                statusDiv.textContent = "Failed to send token.";
            }
        });
    });
});
