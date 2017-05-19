import smoothScroll from "smoothscroll";
import ElevatorController from "./controllers/ElevatorController";
import AnimationController from "./controllers/AnimationController";
import MachineController from "./controllers/MachineController";
import AptController from "./controllers/AptController";

window.localStorage.setItem("floor", 4);
const floorsName = ["ground", "first", "second", "third", "fourth", "fifth"];

const elevatorController = new ElevatorController();
const animationController = new AnimationController();
const machineController = new MachineController();
const aptController = new AptController();

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

(async function renderApts() {
	const machine = document.querySelector("[data-apts]");
	const apts = await aptController.getApts();
	let html = apts.data.map(aptController.prepareItemHtml).join("");
	machine.innerHTML = html;
})();

const machine = document.querySelector("[open-machine]");
machine.addEventListener("click", aptController.open);

const formAuthenticate = document.querySelector("[authenticate-submit]");
const inputPassword = document.querySelector("[input-passoword]");

inputPassword.addEventListener("keydown", e => {
	formAuthenticate.item.forEach(row => row.addEventListener("change", aptController.cleanAfd));
	e.preventDefault();
	if(inputPassword.value.length == 0) aptController.openAfd();
	const auth = aptController.authenticate(e, formAuthenticate);
	auth.then(response => {
		inputPassword.value = response.password;
		response.validated && response.length == 4 ? machineController.open() : null; 
		response.validated ? aptController.renderSuccess(response.length) :  aptController.renderError(response.length); 
	});
});

const buyed = document.querySelector("[buy-submit]");
buyed.addEventListener("submit", e => {
	e.preventDefault();
	const buy = aptController.buy(e);
});

const closed = document.querySelector("[close-submit]");
closed.addEventListener("submit", e => {
	e.preventDefault();
	aptController.close(e);
});