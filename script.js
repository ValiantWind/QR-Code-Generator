const qrCodeTypeSelect = document.getElementById("qrCodeType");
const contentInputsContainer = document.getElementById("content-inputs");
const qrDisplay = document.getElementById("qrDisplay");
const qrCodeImg = document.getElementById("img");
const downloadLink = document.getElementById("downloadLink");
const inputUrl = document.getElementById("inputUrl");
const inputTwitterHandle = document.getElementById("inputTwitterHandle");
const emailInputs = document.getElementById("emailInputs");
const smsInputs = document.getElementById("smsInputs");


const QR_CODE_TYPES = [
    {
        id: "regular",
        label: "URL",
        visibleInputs: ["inputUrl"],
        handler: () => {
            if (!validateUrlInput(inputUrl.value)) {
                alert("Please input a valid URL.");
                return null;
            }
            return inputUrl.value;
        }
    },
    {
        id: "twitter",
        label: "Twitter/X",
        visibleInputs: ["inputTwitterHandle"],
        handler: () => `https://x.com/${inputTwitterHandle.value}`
    },
    {
        id: "phoneNumber",
        label: "Phone Call",
        visibleInputs: ["phoneNumberInputs"],
        handler: () => {
            const telNumber = document.getElementById("telNumber").value;
            const countryCode = document.getElementById("countryCode").value;
            if (!telNumber) {
                alert("Please enter at least a phone number.");
                return null;
            }
            return `tel:${countryCode ?? ""}${telNumber}`;
        }
    },
    {
        id: "sms",
        label: "SMS",
        visibleInputs: ["smsInputs"],
        handler: () => {
            const phone = document.getElementById("phoneNumber").value;
            const message = document.getElementById("message").value;
            if (!phone || !message) {
                alert("Please enter both a phone number and a message.");
                return null;
            }
            return `sms:${phone}?body=${encodeURIComponent(message)}`;
        }
    },
    {
        id: "email",
        label: "Email",
        visibleInputs: ["emailInputs"],
        handler: () => {
            const address = document.getElementById("emailAddress").value;
            const subject = document.getElementById("emailSubject").value;
            const body = document.getElementById("emailBody").value;
            if (!address) {
                alert("Please enter an email address.");
                return null;
            }
            return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
    },
    // {
    //     id: "ios",
    //     label: "iOS Apps",
    //     visibleInputs: ["iosAppInputs"],
    //     handler: () => {
    //         const iosAppType = document.getElementById("iosAppType").value;
    //         const iosSchemeMap = {
    //             "app-store": "itms-apps://itunes.apple.com", "books": "ibooks://",
    //             "calc": "calc://", "calendar": "x-apple-calevent://", "camera": "camera://",
    //             "clips": "clips://", "contacts": "contact://", "facetime": "facetime-open-link://",
    //             "files": "shareddocuments://", "find-my": "findmy://", "fitness": "fitnessapp://",
    //             "freeform": "freeform://", "garageband": "garageband://", "health": "x-apple-health://",
    //             "home": "x-hm://", "imovie": "imovie://", "itunes": "itms://", "keynote": "x-keynote-live://",
    //             "maps": "maps://", "mail": "message://", "messages": "messages://", "music": "music://",
    //             "news": "applenews://", "notes": "mobilenotes://", "numbers": "com.apple.iwork.numbers-share://",
    //             "phone": "mobilephone://", "photos": "photos://", "podcasts": "podcasts://",
    //             "settings": "prefs://", "reminders": "x-apple-reminder://", "safari": "x-web-search://",
    //             "shortcuts": "shortcuts://", "stocks": "stocks://", "support": "applesupport://",
    //             "testflight": "itms-beta://", "TV": "videos://", "TV Remote": "tvremote://",
    //             "voicememos": "voicememos://", "wallet": "wallet://", "watch": "bridge://",
    //         };
    //         return iosSchemeMap[iosAppType] || null;
    //     }
    // },
    {
        id: "rickroll",
        label: "Rickroll",
        visibleInputs: [],
        handler: () => "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
];

async function generate() {
    const submitButton = document.getElementById('submit');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Generating...';
    submitButton.disabled = true;

    try {
        const selectedType = qrCodeTypeSelect.value;
        const typeConfig = QR_CODE_TYPES.find(t => t.id === selectedType);
        
        if (!typeConfig) {
            throw new Error("Invalid QR code type selected.");
        }

        const endpoint = typeConfig.handler();
        
        if (endpoint === null) {
            return;
        }

        const color = document.getElementById("inputColor").value || '';
        const fileFormat = document.getElementById("fileFormat").value;
        const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(endpoint)}&color=${color}&format=${fileFormat}`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch QR code from API.");
        }
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        showQRCode(imageUrl, fileFormat);

    } catch (error) {
        console.error("Failed to generate QR code:", error);
        alert("Could not generate QR code. Please try again.");
    } finally {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
}

function handleTypeChange() {
    const selectedType = qrCodeTypeSelect.value;
    const typeConfig = QR_CODE_TYPES.find(t => t.id === selectedType);

    Array.from(contentInputsContainer.children).forEach(child => {
        child.setAttribute('hidden', true);
    });

    if (typeConfig && typeConfig.visibleInputs) {
        typeConfig.visibleInputs.forEach(inputId => {
            const inputElement = document.getElementById(inputId);
            if (inputElement) {
                inputElement.removeAttribute('hidden');
            }
        });
    }
}

function populateQRCodeTypes() {
    QR_CODE_TYPES.forEach(type => {
        const option = document.createElement('option');
        option.value = type.id;
        option.textContent = type.label;
        qrCodeTypeSelect.appendChild(option);
    });
}

function showQRCode(imageUrl, fileFormat) {
    qrCodeImg.src = imageUrl;
    qrDisplay.removeAttribute("hidden");
    setTimeout(() => {
        qrDisplay.classList.add("visible");
    }, 10);

    const copyButton = resetButton(document.getElementById('copyurl'), "Copy URL");
    const shareButton = resetButton(document.getElementById('share'), "Share");
    const downloadButton = resetButton(document.getElementById('downloadButton'), "Download");

    copyImageUrl(copyButton, imageUrl);
    share(shareButton, imageUrl);
    downloadImage(downloadButton, imageUrl, fileFormat);
}

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");
    const ripple = button.querySelector(".ripple");
    ripple && ripple.remove();
    button.appendChild(circle);
}

function resetButton(button, label) {
    button.textContent = label;
    const clone = button.cloneNode(true);
    button.replaceWith(clone);
    clone.addEventListener("click", createRipple);
    return clone;
}

function share(button, url) {
    button.addEventListener("click", () => {
        if (navigator.canShare) {
            navigator.share({ url });
        } else {
            alert("Your browser does not support the share feature.");
        }
    });
}

function copyImageUrl(button, url) {
    button.addEventListener("click", () => {
        navigator.clipboard.writeText(url).then(() => {
            button.textContent = "Copied!";
            setTimeout(() => button.textContent = "Copy URL", 3000);
        });
    });
}

function downloadImage(button, url, format) {
    button.addEventListener("click", () => {
        downloadLink.href = url;
        downloadLink.download = `qrcode.${format}`;
        downloadLink.click();
    });
}

function validateUrlInput(url) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$', 'i');
    return pattern.test(url);
}

document.addEventListener('DOMContentLoaded', () => {
    populateQRCodeTypes();
    handleTypeChange();
    qrCodeTypeSelect.addEventListener('change', handleTypeChange);
    document.querySelectorAll("button").forEach(button => button.addEventListener("click", createRipple));
});