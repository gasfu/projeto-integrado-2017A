import smoothScroll from "smoothscroll";

export default class ElevatorController {
	
	constructor() {
		this.control = document.querySelector("[control]");	
		this._setGround();

		this.endElevatorAudio = new Audio("/assets/audio/ringElevator.mp3");
		this.elevatorAudio = new Audio("/assets/audio/musicElevator.mp3");
	}

	move(section, value) {
		this.control.classList.add("--hide");
		const time = Math.abs(window.localStorage.getItem("floor") - value) * 2000;
		const floor = document.querySelector(`#${section}`);
		
		const openNextDoor = () => {
			this.elevatorAudio.pause();
			this.endElevatorAudio.play();
			setTimeout(() =>{
				const nextDoor = document.querySelector(`#${section} .open`);
				this.openDoor(nextDoor, false);
			}, 1500)
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
		this.elevatorAudio.currentTime = 0;
		this.elevatorAudio.play();

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