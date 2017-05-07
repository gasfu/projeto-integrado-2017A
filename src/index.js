import smoothScroll from "smoothScroll";
import ElevadorController from "./controllers/ElevadorController";

window.localStorage.setItem("floor", 4);
const floors = ["ground", "first", "second", "third", "fourth"];

//Add action in control
const controlButtons = document.querySelectorAll("[control-action-move]");
controlButtons.forEach(button => { 
	button.addEventListener("click", (button) => { 
		ElevadorController.move(floors[button.target.value], button.target.value); 
	});
});