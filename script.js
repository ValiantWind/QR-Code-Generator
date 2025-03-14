// The Ripple Animation for the Button
let inputUrl = document.getElementById("inputUrl");
let inputTwitterHandle = document.getElementById("inputTwitterHandle")
let qrCodeType = document.getElementById("qrCodeType");
let smsInputs = document.getElementById("smsInputs");
let phoneNumberInput = document.getElementById("phoneNumber");
let messageInput = document.getElementById("message");
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

function toggleElementsVisibility(elements, shouldShow) {
    elements.forEach(element => {
        if (element) {
            if (shouldShow) {
                element.removeAttribute("hidden");
            } else {
                element.setAttribute("hidden", true);
            }
        }
    });
}

qrCodeType.addEventListener("change", () => {
    const elementsToHideForRegular = [inputTwitterHandle, smsInputs];
    const elementsToHideForTwitter = [inputUrl, shareButton, smsInputs];
    const elementsToHideForRickroll = [inputUrl, inputTwitterHandle, shareButton, smsInputs];
	const elementsToHideForSMS = [inputUrl, inputTwitterHandle];

    switch (qrCodeType.value) {
		case "sms": 
			smsInputs.setAttribute("display", "flex");
			toggleElementsVisibility([smsInputs], true);
			toggleElementsVisibility(elementsToHideForSMS, false);
			break;
        case "regular":
            toggleElementsVisibility([inputUrl, inputTwitterHandle], true);
            toggleElementsVisibility(elementsToHideForRegular, false);
            break;
        case "twitter":
            toggleElementsVisibility([inputUrl, inputTwitterHandle, smsInputs], false);
            toggleElementsVisibility([inputTwitterHandle], true);
            toggleElementsVisibility(elementsToHideForTwitter, false);
            break;
        case "rickroll":
            toggleElementsVisibility([inputUrl, inputTwitterHandle, smsInputs], false);
            toggleElementsVisibility(elementsToHideForRickroll, false);
            break;
        default:
            toggleElementsVisibility([inputUrl, inputTwitterHandle], false);
            toggleElementsVisibility([fileInputLabel, fileInput], false);
    }
});

function downloadImage(url, format) {
    downloadButton.addEventListener("click", () => {
        downloadLink.href = url;
        downloadLink.download = `qrcode.${format}`;
        downloadLink.click();
    });
}

// SMS QR Code Handled Seperately
function generateSMSQRCode() {
    const phoneNumber = phoneNumberInput.value;
    const message = messageInput.value;
    
    if (!phoneNumber || !message) {
        alert("Please enter both phone number and message.");
        return;
    }

    const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

    fetchQRCode(smsUrl, "", "png").then(res => {
        const imageUrl = URL.createObjectURL(res);
        qrCode.hidden = false;
        qrCode.src = imageUrl;
        copyImageUrl(copyButton, imageUrl);
        share(shareButton, imageUrl);
        downloadImage(imageUrl, "png");
    });
}



function generate() {
    const inputColor = document.getElementById("inputColor").value;
    const url = inputUrl.value;
	let endpoint = url;

	

    const fileFormat = document.getElementById("fileFormat").value;
    const color = inputColor || '';
	
	if(qrCodeType.value === "regular") {
		if (!validateUrlInput(url)) {
			alert("Please input a valid URL for the QR Code");
			return;
		}
	} else if (qrCodeType.value === "rickroll") {
        endpoint = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
    } else if (qrCodeType.value === "twitter") {
        endpoint = `https://x.com/${url}`;
    } else if (qrCodeType.value === "sms") {
        generateSMSQRCode();
        return;
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

function validateUrlInput(url) {
	const pattern = new RegExp(
	  '^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$', // fragment locator
	  'i'
	);
	return pattern.test(url);
  }
