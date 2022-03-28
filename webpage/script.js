
function reset(){
}
function generateWindows(){
	if (!window.windowBoxs){
		windowBoxs = {
			"stats":document.getElementById("WinScreen"),
			"settings":document.getElementById("Settings"),
			"main":document.querySelector(":root"),
		}
	}
}
function sinkPopup(){
	windowBoxs[window.screen].classList.add("popup-sink");
	windowBoxs[window.screen].classList.remove("popup-rise");
	screenCpy = window.screen;
	window.risen = false;
	setTimeout(() => {
		windowBoxs[screenCpy].classList.remove("popup-sink");
	}, 500);
}
function risePopup(){
	windowBoxs[window.screen].classList.add("popup-rise");
	windowBoxs[window.screen].classList.remove("popup-sink");
	setTimeout(() => {
		window.risen = true;
	}, 500);
}
document.addEventListener("click", function(e){
	if (window.risen){
		generateWindows();
		if (
			window.screen != "main" &&
			!(
				e.x > windowBoxs[window.screen].getBoundingClientRect().x &&
			e.x < windowBoxs[window.screen].getBoundingClientRect().x + windowBoxs[window.screen].getBoundingClientRect().width &&
			e.y > windowBoxs[window.screen].getBoundingClientRect().y &&
			e.y < windowBoxs[window.screen].getBoundingClientRect().y + windowBoxs[window.screen].getBoundingClientRect().height
		)
		){
			sinkPopup();
			window.screen = "main";
		}
	}
});
function reopenScreen(){
	generateWindows();
	if (window.screen == "main"){
		window.screen = "stats";
		risePopup();
	}
}
window.column = 0;
window.row = 0;
window.guess = "";
window.screen = "main";
window.risen = false;

function settingsScreen(){
	generateWindows();
	if (window.screen == "main"){
		window.screen = "settings";
		risePopup();
	}
}
function SendError(error,timeout=1500){
	ErrorList = document.getElementById("errorList");
	var ErrorDiv = document.createElement("DIV");
	ErrorDiv.classList.add("error");
	ErrorDiv.textContent = error;
	ErrorDiv.style += "--hide_length : "+
	ErrorList.appendChild(ErrorDiv);
	if (timeout > 0){
		setTimeout(() => {
			ErrorDiv.remove();
		}, timeout);
	}
	return ErrorDiv;
}
String.prototype.setCharAt = function (index,chr) {
	if(index > this.length-1) return this;
	return this.substring(0,index) + chr + this.substring(index+1);
}
