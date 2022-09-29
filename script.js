
// fetch a json file
function fetchFile(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var data = JSON.parse(xhr.responseText);
				return data;
			}
		}
	}
	xhr.send();
	return null;
}

let links = fetchFile('https://ValiantWind.github.io/config/config.json');
console.log(links)

function generate(){
    var inputUrl = document.getElementById("inputUrl");
		var inputColor = document.getElementById("inputColor").value;
	var fileFormat = document.getElementById("fileFormat").value;
	let url = inputUrl.value;
	
	// If the url inputted is one of the links on the malicious links list, the url will change to a rickroll automatically :)
	if(forbiddenLinks){
		url = "https://ValiantWind.github.io/puppy";
	}
	var qrCode = document.getElementById("img");
    var defaultApi = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}&format=${fileFormat}`;
		var coloredApi = 	`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}&color=${inputColor}&format=${fileFormat}`;
	if(!inputColor){
		qrCode.src = defaultApi
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

