function generate(){
    var inputUrl = document.getElementById("inputUrl").value;
		var inputColor = document.getElementById("inputColor").value;
	var fileFormat = document.getElementById("fileFormat").value;
	var qrCode = document.getElementById("img");
    var defaultApi = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputUrl}&format=${fileFormat}`;
		var coloredApi = 	`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputUrl}&color=${inputColor}&format=${fileFormat}`;
	if(!inputColor){
		qrCode.src = defaultApi;
	} else {
		qrCode.src = coloredApi;
	}
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

  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

const buttons = document.getElementsByTagName("button");
for (const button of buttons) {
  button.addEventListener("click", createRipple);
}

