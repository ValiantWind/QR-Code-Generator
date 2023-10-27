// The Ripple Animation for the Button
let inputUrl = document.getElementById("inputUrl");
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

	const ripple = button.getElementsByClassName("ripple")[0];

	if (ripple) {
		ripple.remove();
	}

	button.appendChild(circle);
}

// Loop through all the buttons on the website and apply the ripple effect to each one
for (const button of buttons) {
	button.addEventListener("click", createRipple);
}

function share(button, url) {
	if (button) {
		const shareData = {
			url: url
		}
		button.addEventListener("click", () => {
			if(!navigator.canShare){
				button.innerHTML = "Your browser does not support the share feature."
			} else {
				navigator.share(shareData);
			}
		})
	}
}

function copyImageUrl(button, url) {
	if (button) {
		button.addEventListener("click", () => {
			navigator.clipboard.writeText(url).then(() => {
				button.innerHTML = "Copied to Clipboard!";

				setTimeout(() => {
					button.innerHTML = "Copy Image URL";

				}, 3000)
			})
		})
	}
}


qrCodeType.addEventListener("change", () => {
	if(qrCodeType.value === "regular"){
		if(inputUrl.hasAttribute("hidden")){
			inputUrl.removeAttribute("hidden");
		}
		if(!fileInputLabel.hasAttribute("hidden")){
			fileInputLabel.setAttribute("hidden", true);
		}
		if(!fileInput.hasAttribute("hidden")){
			fileInput.setAttribute("hidden", true);
		}
	} else if(qrCodeType.value === "file"){
		inputUrl.setAttribute("hidden", true);

		fileInputLabel.removeAttribute("hidden");
		fileInput.removeAttribute("hidden");
	} else if(qrCodeType.value == "rickroll"){
		inputUrl.setAttribute("hidden", true);

		if(!fileInputLabel.hasAttribute("hidden")){
			fileInputLabel.setAttribute("hidden", true);
		}
		if(!fileInput.hasAttribute("hidden")){
			fileInput.setAttribute("hidden", true);
		}
	}
})

function downloadImage(url, imageFormat){
	if (downloadButton) {
				downloadButton.addEventListener("click", () => {
					downloadLink.href = url
					downloadLink.download = `qrcode.${imageFormat}`
					downloadLink.click();
				})
		}
}

// Where the QR Code is Generated
function generate() {
	let inputColor = document.getElementById("inputColor").value;
	let url = inputUrl.value;

	// API Endpoint Used for the QR Code
	const defaultApi = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}&format=${fileFormat}`;

	// // We use a separate endpoint if a Hex Color is inputted
	const coloredApi = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}&color=${inputColor}&format=${fileFormat}`;

	// If the user has not input a Hex Color, we use the default endpoint
	if(qrCodeType.value === "regular"){
		if(!url){
			alert("Please input a URL for the QR Code")
		}
	if (!inputColor) {
		fetch(defaultApi).then((response) => {
			return response.blob();
		}).then((res) => {
			const imageUrl = URL.createObjectURL(res);
			if(qrCode.hasAttribute("hidden")){
				qrCode.removeAttribute("hidden");
			}
			qrCode.src = imageUrl
			copyImageUrl(copyButton, imageUrl);
			share(shareButton, imageUrl);
			downloadImage(imageUrl, fileFormat);
		})
	} else {
		fetch(coloredApi).then((response) => {
			return response.blob()
		}).then((res) => {
			const imageUrl = URL.createObjectURL(res);
			if(qrCode.hasAttribute("hidden")){
				qrCode.removeAttribute("hidden");
			}
			qrCode.src = imageUrl
			copyImageUrl(copyButton, imageUrl);
			share(shareButton, imageUrl);
			downloadImage(imageUrl, fileFormat);
		})
	}
	} else if(qrCodeType.value === "file"){
	// 	let selectedFile = fileInput.files[0];

	// 	if (!inputColor) {
	// 	fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.youtube.com/watch?v=a3Z7zEc7AXQ&format=${fileFormat}`).then((response) => {
	// 		return response.blob();
	// 	}).then((res) => {
	// 		const imageUrl = URL.createObjectURL(res);
	// 		if(qrCode.hasAttribute("hidden")){
	// 			qrCode.removeAttribute("hidden");
	// 		}
	// 		qrCode.src = imageUrl
	// 		copyImageUrl(copyButton, imageUrl);
	// 		share(shareButton, defaultApi);
	// 		downloadImage(imageUrl, fileFormat);
	// 	})
	// } else {
	// 	fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.youtube.com/watch?v=a3Z7zEc7AXQ&color=${inputColor}&format=${fileFormat}`).then((response) => {
	// 		return response.blob()
	// 	}).then((res) => {
	// 		const imageUrl = URL.createObjectURL(res);
	// 		if(qrCode.hasAttribute("hidden")){
	// 			qrCode.removeAttribute("hidden");
	// 		}
	// 		qrCode.src = imageUrl
	// 		copyImageUrl(copyButton, imageUrl);
	// 		share(shareButton, coloredApi);
	// 		downloadImage(imageUrl, fileFormat);
	// 	})
	// }

		
		
	} else if(qrCodeType.value === "rickroll"){
			if (!inputColor) {
		fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.youtube.com/watch?v=a3Z7zEc7AXQ&format=${fileFormat}`).then((response) => {
			return response.blob();
		}).then((res) => {
			const imageUrl = URL.createObjectURL(res);
			if(qrCode.hasAttribute("hidden")){
				qrCode.removeAttribute("hidden");
			}
			qrCode.src = imageUrl
			copyImageUrl(copyButton, imageUrl);
			share(shareButton, imageUrl);
			downloadImage(imageUrl, fileFormat);
		})
	} else {
		fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.youtube.com/watch?v=a3Z7zEc7AXQ&color=${inputColor}&format=${fileFormat}`).then((response) => {
			return response.blob()
		}).then((res) => {
			const imageUrl = URL.createObjectURL(res);
			if(qrCode.hasAttribute("hidden")){
				qrCode.removeAttribute("hidden");
			}
			qrCode.src = imageUrl
			copyImageUrl(copyButton, imageUrl);
			share(shareButton, imageUrl);
			downloadImage(imageUrl, fileFormat);
		})
	}
	}
}

function removeHiddenAttribute(element){
}