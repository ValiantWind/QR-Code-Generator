let inputUrl = document.getElementById("inputUrl");
let inputTwitterHandle = document.getElementById("inputTwitterHandle");
let qrCodeType = document.getElementById("qrCodeType");
let smsInputs = document.getElementById("smsInputs");
let phoneNumberInput = document.getElementById("phoneNumber");
let messageInput = document.getElementById("message");
let emailInputs = document.getElementById("emailInputs");
let emailAddress = document.getElementById("emailAddress");
let emailSubject = document.getElementById("emailSubject");
let emailBody = document.getElementById("emailBody");
let iosAppType = document.getElementById("iosAppType")
let qrCode = document.getElementById("img");
const copyButton = document.getElementById("copyurl");
const shareButton = document.getElementById("share");
const downloadButton = document.getElementById("downloadButton");
const downloadLink = document.getElementById("downloadLink");
const mainEl = document.getElementById("main");


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


function activateSplitLayout() {
  if (!mainEl.classList.contains("qr-generated")) {
    mainEl.classList.add("qr-generated");
  }
}


function fetchQRCode(url, color, fileFormat) {
  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}&color=${color || ''}&format=${fileFormat}`;
  return fetch(apiUrl).then(response => response.blob());
}


function resetButton(button, label) {
  button.textContent = label;
  const clone = button.cloneNode(true);
  button.replaceWith(clone);
  return clone;
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

function downloadImage(button, url, format) {
  button.addEventListener("click", () => {
    downloadLink.href = url;
    downloadLink.download = `qrcode.${format}`;
    downloadLink.click();
  });
}


function toggleElementsVisibility(elements, shouldShow) {
  elements.forEach(element => {
    if (!element) return;
    if (shouldShow) {
      element.removeAttribute("hidden");
    } else {
      element.setAttribute("hidden", true);
    }
  });
}

qrCodeType.addEventListener("change", () => {
    smsInputs.style.display = "none";
    emailInputs.style.display = "none";
    
    switch (qrCodeType.value) {
        case "sms":
            smsInputs.style.display = "flex";
            inputUrl.setAttribute("hidden", true);
            inputTwitterHandle.setAttribute("hidden", true);
            iosAppType.setAttribute("hidden", true);
        break;
        case "regular":
            inputUrl.removeAttribute("hidden");
            inputTwitterHandle.setAttribute("hidden", true);
            iosAppType.setAttribute("hidden", true);
        break; 
        case "email":
            emailInputs.style.display = "flex";
            inputUrl.setAttribute("hidden", true);
            inputTwitterHandle.setAttribute("hidden", true);
            iosAppType.setAttribute("hidden", true);
        break;
        case "twitter":
            inputUrl.setAttribute("hidden", true);
            inputTwitterHandle.removeAttribute("hidden");
            iosAppType.setAttribute("hidden", true);
        break;
        case "rickroll":
            inputUrl.setAttribute("hidden", true);
            inputTwitterHandle.setAttribute("hidden", true);
            iosAppType.setAttribute("hidden", true);
        break;
         case "ios":
            inputUrl.setAttribute("hidden", true);
            inputTwitterHandle.setAttribute("hidden", true);
            iosAppType.removeAttribute("hidden");
        break;
  }
});


function generateSMSQRCode() {
  const phoneNumber = phoneNumberInput.value;
  const message = messageInput.value;

  if (!phoneNumber || !message) {
    alert("Please enter both phone number and message.");
    return;
  }

  const protocol = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

  fetchQRCode(protocol, "", "png").then(res => {
    const imageUrl = URL.createObjectURL(res);
    showQRCode(imageUrl, "png");
  });
}

function generateEmailQRCode() {
  const address = emailAddress.value;
  const subject = emailSubject.value;
  const body = emailBody.value;

  if (!emailAddress || !emailSubject || !emailBody) {
    alert("Please enter all three fields.");
    return;
  }

  const protocol = `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  fetchQRCode(protocol, "", "png").then(res => {
    const imageUrl = URL.createObjectURL(res);
    showQRCode(imageUrl, "png");
  });
}

function generateiOSAppQRCode() {

    switch (iosAppType.value) {
         case "app-store":
            fetchQRCode("itms-apps://itunes.apple.com", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "books":
            fetchQRCode("ibooks://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "calc":
            fetchQRCode("calc://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "calendar": 
            fetchQRCode("x-apple-calevent://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "camera":
            fetchQRCode("camera://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "clips":
            fetchQRCode("clips://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "contacts":
            fetchQRCode("contact://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "facetime":
            fetchQRCode("facetime-open-link://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "files":
            fetchQRCode("shareddocuments://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "find-my":
            fetchQRCode("findmy://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "fitness":
            fetchQRCode("fitnessapp://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "freeform":
            fetchQRCode("freeform://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "garageband":
            fetchQRCode("garageband://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "health":
            fetchQRCode("x-apple-health://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "home":
            fetchQRCode("x-hm://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "imovie":
           fetchQRCode("imovie://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "itunes":
            fetchQRCode("itms://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "keynote":
            fetchQRCode("x-keynote-live://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "maps":
            fetchQRCode("maps://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "mail":
            fetchQRCode("message://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "messages":
            fetchQRCode("messages://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "music":
            fetchQRCode("music://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "news":
            fetchQRCode("applenews://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "notes": 
            fetchQRCode("mobilenotes://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "numbers":
            fetchQRCode("com.apple.iwork.numbers-share://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "phone":
            fetchQRCode("mobilephone://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "photos":
           fetchQRCode("photos://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "podcasts":
            fetchQRCode("podcasts://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "settings":
            fetchQRCode("prefs://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "reminders":
            fetchQRCode("x-apple-reminder://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "safari":
            fetchQRCode("x-web-search://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "shortcuts":
            fetchQRCode("shortcuts://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "stocks":
            fetchQRCode("stocks://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "support":
            fetchQRCode("applesupport://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "testflight":
            fetchQRCode("itms-beta://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "TV":
            fetchQRCode("videos://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "TV Remote":
            fetchQRCode("tvremote://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "voicememos":
            fetchQRCode("voicememos://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "wallet":
            fetchQRCode("wallet://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
        case "watch":
            fetchQRCode("bridge://", "", "png").then(res => {
                const imageUrl = URL.createObjectURL(res);
                showQRCode(imageUrl, "png");
            });
            break;
    }
}


function generate() {
  const inputColor = document.getElementById("inputColor").value;
  const url = inputUrl.value;
  const fileFormat = document.getElementById("fileFormat").value;
  const color = inputColor || '';
  let endpoint = url;

  if (qrCodeType.value === "regular") {
    if (!validateUrlInput(url)) {
      alert("Please input a valid URL for the QR Code");
      return;
    }
  } else if (qrCodeType.value === "rickroll") {
    endpoint = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
  } else if (qrCodeType.value === "twitter") {
    endpoint = `https://x.com/${url}`;
  } else if (qrCodeType.value === "email"){
    generateEmailQRCode();
    return;
  } else if (qrCodeType.value === "sms") {
    generateSMSQRCode();
    return;
  } else if(qrCodeType.value === "ios") {
    generateiOSAppQRCode();
    return;
  }

  fetchQRCode(endpoint, color, fileFormat).then(res => {
    const imageUrl = URL.createObjectURL(res);
    showQRCode(imageUrl, fileFormat);
  });
}


function showQRCode(imageUrl, fileFormat) {
  qrCode.hidden = false;
  qrCode.src = imageUrl;

  activateSplitLayout();

  const newCopy = resetButton(copyButton, "Copy Image URL");
  const newShare = resetButton(shareButton, "Share QR Code");
  const newDownload = resetButton(downloadButton, "Download QR Code Image");

  newCopy.id = "copyurl";
  newShare.id = "share";
  newDownload.id = "downloadButton";

  copyImageUrl(newCopy, imageUrl);
  share(newShare, imageUrl);
  downloadImage(newDownload, imageUrl, fileFormat);
}


function validateUrlInput(url) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return pattern.test(url);
}