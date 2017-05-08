import smoothScroll from "smoothScroll";
import ElevatorController from "./controllers/ElevatorController";

window.localStorage.setItem("floor", 4);
const floors = ["ground", "first", "second", "third", "fourth", "fifth"];

const elevatorController = new ElevatorController();

//Add action in control
const controlButtons = document.querySelectorAll("[control-action-move]");
controlButtons.forEach(button => { 
	button.addEventListener("click", () => { 
		elevatorController.move(floors[button.value], button.value); 
	});
});

const openDoorButtons = document.querySelectorAll("[open-action]");
openDoorButtons.forEach(button => {
	button.addEventListener("click", () => {
		elevatorController.openDoor(button, true);
	});
});