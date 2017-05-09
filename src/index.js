import smoothScroll from "smoothscroll";
import ElevatorController from "./controllers/ElevatorController";
import AnimationController from "./controllers/AnimationController";

window.localStorage.setItem("floor", 4);
const floorsName = ["ground", "first", "second", "third", "fourth", "fifth"];

const elevatorController = new ElevatorController();
const animationController = new AnimationController();

//Add action in control
const controlButtons = document.querySelectorAll("[control-action-move]");
controlButtons.forEach(button => { 
	button.addEventListener("click", () => { 
		elevatorController.move(floorsName[button.value], button.value); 
	});
});

const openDoorButtons = document.querySelectorAll("[open-action]");
openDoorButtons.forEach(button => {
	button.addEventListener("click", (e) => {
		e.stopPropagation();
		elevatorController.openDoor(button, true);
	});
});

const floors = document.querySelectorAll(".floor");
floors.forEach(floor => {
	floor.addEventListener("click", () => {
		elevatorController.closeDoor();
	});
});

const cat = document.querySelector("[cat-action]");
cat.addEventListener("mouseover", () => {
	animationController.cat();
});

const sky = document.querySelector(".floor.--fifth");
sky.addEventListener("click", () => {
	animationController.cloud(sky);
});