import smoothScroll from "smoothscroll";
import ElevatorController from "./controllers/ElevatorController";
import AnimationController from "./controllers/AnimationController";
import MachineController from "./controllers/MachineController";

window.localStorage.setItem("floor", 4);
const floorsName = ["ground", "first", "second", "third", "fourth", "fifth"];

const elevatorController = new ElevatorController();
const animationController = new AnimationController();
const machineController = new MachineController();

//Add action in control
const controlButtons = document.querySelectorAll("[control-action-move]");
controlButtons.forEach(button => { 
	button.addEventListener("click", () => { 
		elevatorController.move(floorsName[button.value], button.value); 
	});
});

const controlHelperButton = document.querySelector("[control-action-helper]");
controlHelperButton.addEventListener("click", () => {
	window.open("https://github.com/gasfu/projeto-integrado-2017A");
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

(async function renderProducts() {
	const machine = document.querySelector("[data-machine]");
	const products = await machineController.getProducts();
	let html = products.data.map(machineController.prepareItemHtml).join("");
	machine.innerHTML = html;
})();

const machine = document.querySelector("[open-machine]");
machine.addEventListener("click", machineController.open);
