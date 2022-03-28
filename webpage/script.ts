
function reset(){
}
interface windowBoxs {
	// name: keyof typeof plotOptions;
	x: Array<number>;
	y: Array<number>;
}
var windowBoxs:Record<string, HTMLElement>;
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
	windowBoxs[window.currScreen].classList.add("popup-sink");
	windowBoxs[window.currScreen].classList.remove("popup-rise");
	var screenCpy:string = window.currScreen;
	window.risen = false;
	setTimeout(() => {
		windowBoxs[screenCpy].classList.remove("popup-sink");
	}, 500);
}
function risePopup(){
	windowBoxs[window.currScreen].classList.add("popup-rise");
	windowBoxs[window.currScreen].classList.remove("popup-sink");
	setTimeout(() => {
		window.risen = true;
	}, 500);
}
document.addEventListener("click", function(e){
	if (window.risen){
		generateWindows();
		if (
			window.currScreen != "main" &&
			!(
				e.x > windowBoxs[window.currScreen].getBoundingClientRect().x &&
			e.x < windowBoxs[window.currScreen].getBoundingClientRect().x + windowBoxs[window.currScreen].getBoundingClientRect().width &&
			e.y > windowBoxs[window.currScreen].getBoundingClientRect().y &&
			e.y < windowBoxs[window.currScreen].getBoundingClientRect().y + windowBoxs[window.currScreen].getBoundingClientRect().height
		)
		){
			sinkPopup();
			window.currScreen = "main";
		}
	}
});
function reopenScreen(){
	generateWindows();
	if (window.currScreen == "main"){
		window.currScreen = "stats";
		risePopup();
	}
}


interface Window {
	currScreen: string;
	risen: boolean;
}

window.currScreen = "main";
window.risen = false;

function settingsScreen(){
	generateWindows();
	if (window.currScreen == "main"){
		window.currScreen = "settings";
		risePopup();
	}
}
function SendError(error:string,timeout=1500){
	var ErrorList = document.getElementById("errorList");
	var ErrorDiv = document.createElement("DIV");
	ErrorDiv.classList.add("error");
	ErrorDiv.textContent = error;
	ErrorDiv.setAttribute(
		"style",
		ErrorDiv.getAttribute("style")+"--hide_length : "+timeout
	);
	ErrorList.appendChild(ErrorDiv);
	if (timeout > 0){
		setTimeout(() => {
			ErrorDiv.remove();
		}, timeout);
	}
	return ErrorDiv;
}
// String.prototype.setCharAt = function (index:number,chr:string) {
// 	if(index > this.length-1) return this;
// 	return this.substring(0,index) + chr + this.substring(index+1);
// }
