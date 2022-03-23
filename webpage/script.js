
function reset(){
	window.guess = "";
	window.column = 0;
	window.row = 0;
	window.screen = "main";
	getNewWord();

	Array.prototype.forEach.call(document.getElementsByClassName("basic_box"), 
		function(item){
			item.classList.remove("full_box");
			item.classList.remove("position_box");
			item.classList.remove("incorrect_box");
			item.classList.remove("correct_box");
			item.classList.add("empty_box");
			item.textContent = "";
		}
	);
	Array.prototype.forEach.call(document.getElementsByClassName("keyboard_button"),
		function(item){
			item.classList.remove("full_box");
			item.classList.remove("position_box");
			item.classList.remove("incorrect_box");
			item.classList.remove("correct_box");
		}
	);
}

function buttonKeyPress(obj){
	key = obj.textContent;
	if (key == "⌫"){
		keyPress({code:"Backspace"});
	}else if (key == "⏎"){
		keyPress({code:"Enter"});
	}else{
		keyPress({code:"Key"+key})
	}
	document.body.focus();
}
document.addEventListener('keydown', keyPress);
window.windowBoxs = false;
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
		if (!window.windowBoxs){
			windowBoxs = {
				"stats":document.getElementById("WinScreen"),
				"settings":document.getElementById("Settings"),
				"main":document.querySelector(":root"),
			}
		}
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
	if (!window.windowBoxs){
		windowBoxs = {
			"stats":document.getElementById("WinScreen"),
			"settings":document.getElementById("Settings"),
			"main":document.querySelector(":root"),
		}
	}
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
	if (!window.windowBoxs){
		windowBoxs = {
			"stats":document.getElementById("WinScreen"),
			"settings":document.getElementById("Settings"),
			"main":document.querySelector(":root"),
		}
	}
	if (window.screen == "main"){
		window.screen = "settings";
		risePopup();
	}
}
function keyPress(e){
	if (window.screen == "main"){
		if (e.code.startsWith("Key")){
			if (window.column < 5){
				box = document.querySelector(".boxes>:nth-child("+String(window.row+1)+")>:nth-child("+String(window.column+1)+")");
				box.textContent = e.code.substring(3);
				window.guess += e.code.substring(3);
				box.classList.remove("empty_box");
				box.classList.add("full_box");
				window.column++;
			}
		}else if (e.code == "Backspace"){
			if (window.column > 0){
				box = document.querySelector(".boxes>:nth-child("+String(window.row+1)+")>:nth-child("+String(window.column)+")");
				box.textContent = "";
				box.classList.remove("full_box");
				box.classList.add("empty_box");
				window.column--;
				window.guess = window.guess.substring(0,window.guess.length-1);
			}
		}else if (e.code == "Enter"){
			if (window.guess.length == 5){
				var LoadingDiv = SendError("Loading",0);
				fetch("validWords/"+window.guess.charAt(0)+".json")
				.then(response => response.json())
				.then(function(resp){
					LoadingDiv.remove();
					if(!resp.includes(window.guess)){
						if (window.guess == window.Word){
							alert("ERROR");
						}
						SendError("Not A Word");
					}else{
						var wordCopy = window.Word;
						var guessCopy = window.guess;
						for (let i = 0; i < 5; i++) {
							box = document.querySelector(".boxes>:nth-child("+String(window.row+1)+")>:nth-child("+String(i+1)+")");
							// box.classList.remove("full_box");
							if (guessCopy.charAt(i) == wordCopy.charAt(i)){
								wordCopy = wordCopy.setCharAt(i, '!');
								box.classList.add("correct_box");
								setTimeout(() => {
									document.getElementById("Key"+guessCopy.charAt(i)).classList.add("correct_box");
								}, 1500);
							}
						}
						for (let i = 0; i < 5; i++) {
							box = document.querySelector(".boxes>:nth-child("+String(window.row+1)+")>:nth-child("+String(i+1)+")");
							// box.classList.remove("full_box");
							if (wordCopy.charAt(i) == "!"){} // ignore already processed letters
							else if (wordCopy.includes(guessCopy.charAt(i))){
								wordCopy = wordCopy.setCharAt(wordCopy.indexOf(guessCopy.charAt(i)), '#');
								box.classList.add("position_box");
								setTimeout(() => {
									document.getElementById("Key"+guessCopy.charAt(i)).classList.add("position_box");
								}, 1500);
							}else{
								box.classList.add("incorrect_box");
								setTimeout(() => {
									document.getElementById("Key"+guessCopy.charAt(i)).classList.add("incorrect_box");
								}, 1500);
							}
						}
						if (window.guess == window.Word){
							window.screen = "stats";
							Array.prototype.forEach.call(
								document.querySelectorAll(".boxes>:nth-child("+String(window.row+1)+")>div"),
								function(el){
									el.classList.add("won")
								}
							);
							setTimeout(() => {
								risePopup();
							}, 2200);

						}else{
							window.row++;
							window.column = 0;
							window.guess=""
						}
					}
				});
			}else{
				SendError("Not enough letters");
			}
		}
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
