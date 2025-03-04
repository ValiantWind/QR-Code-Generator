// The Ripple Animation for the Button
let inputUrl = document.getElementById("inputUrl");
let inputTwitterHandle = document.getElementById("inputTwitterHandle")
let qrCodeType = document.getElementById("qrCodeType");
let fileInputLabel = document.getElementById("fileInputLabel");
let fileInput = document.getElementById("qrCodeFile");
let fileFormat = document.getElementById("fileFormat").value;
let qrCode = document.getElementById("img");
const copyButton = document.getElementById("copyurl");
const shareButton = document.getElementById("share");
const downloadButton = document.getElementById("downloadButton");
const downloadLink = document.getElementById("downloadLink");

const buttons = document.getElementsByTagName("button");



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

document.querySelectorAll("button").forEach(button => button.addEventListener("click", createRipple));

function fetchQRCode(url, color, fileFormat) {
	const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}&color=${color || ''}&format=${fileFormat}`;
	return fetch(apiUrl).then(response => response.blob());
}

function share(button, url) {
    button.addEventListener("click", () => {
        if (navigator.canShare) {
            navigator.share({ url });
        } else {
            button.textContent = "Your browser does not support the share feature.";
        }
    });
}

function copyImageUrl(button, url) {
    button.addEventListener("click", () => {
        navigator.clipboard.writeText(url).then(() => {
            button.textContent = "Copied to Clipboard!";
            setTimeout(() => button.textContent = "Copy Image URL", 3000);
        });
    });
}

qrCodeType.addEventListener("change", () => {
    const isRegular = qrCodeType.value === "regular";
    const isTwitter = qrCodeType.value === "twitter";
    const isRickroll = qrCodeType.value === "rickroll";

	switch (qrCodeType.value) {
		case isRegular: 
			inputUrl.removeAttribute("hidden");
			inputTwitterHandle.setAttribute("hidden", true);
			break;
		case isTwitter: 
			inputUrl.setAttribute("hidden", true);
			inputTwitterHandle.removeAttribute("hidden");
			break;
		case isRickroll: 
			inputUrl.setAttribute("hidden", true);
			inputTwitterHandle.setAttribute("hidden", true);
			break;
	}

   
    toggleElementVisibility(fileInputLabel, false);
    toggleElementVisibility(fileInput, false);
});

function toggleElementVisibility(element, shouldShow) {
    if (shouldShow) {
        element.removeAttribute("hidden");
    } else {
        element.setAttribute("hidden", true);
    }
}

function downloadImage(url, format) {
    downloadButton.addEventListener("click", () => {
        downloadLink.href = url;
        downloadLink.download = `qrcode.${format}`;
        downloadLink.click();
    });
}


function generate() {
    const inputColor = document.getElementById("inputColor").value;
    const url = inputUrl.value;

    if (!validateUrlInput(url)) {
        alert("Please input a valid URL for the QR Code");
        return;
    }

    const fileFormat = document.getElementById("fileFormat").value;
    const color = inputColor || '';
	
	if (qrCodeType.value === "rickroll") {
        endpoint = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
    } else if (qrCodeType.value === "twitter") {
        endpoint = `https://x.com/${url}`;
    }

    fetchQRCode(endpoint, color, fileFormat).then(res => {
        const imageUrl = URL.createObjectURL(res);
        qrCode.hidden = false;
        qrCode.src = imageUrl;
        copyImageUrl(copyButton, imageUrl);
        share(shareButton, imageUrl);
        downloadImage(imageUrl, fileFormat);
    });
}
