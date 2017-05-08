import smoothScroll from "smoothscroll";

export default class ElevatorController {
	
	constructor() {
		this.control = document.querySelector("[control]");	
		this._setGround();
	}

	move(section, value) {
		this.control.classList.add("--hide");

		const time = Math.abs(window.localStorage.getItem("floor") - value) * 2000;
		const floor = document.querySelector(`#${section}`);
		
		const openNextDoor = () => {
			const nextDoor = document.querySelector(`#${section} .open`);
			console.log(nextDoor);
			this.openDoor(nextDoor, false);
		};

		this._closeDoor(() => {
			smoothScroll(floor, time, openNextDoor);
		});

		window.localStorage.setItem("floor", value);
	}

	openDoor(target, control = true) {
		const door = target.previousElementSibling;		
		door.classList.remove("--close");
		door.classList.add("--open");
		control ? this.showControl() : null;
	}

	showControl() {
		setTimeout(() => {
			this.control.classList.remove("--hide")
		}, 2000);	
	}

	_closeDoor(callback) {
		const door = document.querySelector(".door.--open");
		door.classList.remove("--open");
		door.classList.add("--close");
		console.log("teste");
		setTimeout(() => {
			callback();
		}, 1000);	
	}

	_setGround() {
		const section = document.querySelector("#ground");
		window.localStorage.setItem("floor", 0);
		smoothScroll(section, 0);
	}

}