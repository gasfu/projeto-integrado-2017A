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

		this.closeDoor(() => {
			smoothScroll(floor, time, openNextDoor);
		});

		window.localStorage.setItem("floor", value);
	}

	openDoor(target, control = true) {
		const door = target.previousElementSibling;		
		door.classList.remove("--close");
		door.classList.add("--open");
		control ? this.showControl(door) : null;
	}

	showControl(door) {
		const remove = () => {
			this.control.classList.remove("--hide")
		};

		setTimeout(remove , 2000);	
	}

	closeDoor(callback = null) {
		const door = document.querySelector(".door.--open");
		door.classList.remove("--open");
		door.classList.add("--close");
		callback ? setTimeout(callback, 1000) : null;	
	}

	_setGround() {
		const section = document.querySelector("#ground");
		window.localStorage.setItem("floor", 0);
		smoothScroll(section, 0);
	}

}