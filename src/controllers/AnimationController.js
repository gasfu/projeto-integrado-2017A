export default class AnimationController {
	constructor() {
		this.catAudio = new Audio("/assets/audio/cat.mp3");
	}

	cat() {
		this.catAudio.play();
	}
}