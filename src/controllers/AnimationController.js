export default class AnimationController {
	constructor() {
		this.catAudio = new Audio("/assets/audio/cat.mp3");
		this.trovaoAudio = new Audio("/assets/audio/trovao.mp3");
		this.birdAudio = new Audio("/assets/audio/bird.mp3");
		this.rain = false;
	}

	cat() {
		this.catAudio.play();
	}
	
	cloud(sky) {
		this.rain ? this.trovaoAudio.pause() : this.trovaoAudio.play();
		this.rain ? this.birdAudio.play() : this.birdAudio.pause();
		sky.classList.toggle("--cloudy");
		this.rain = !this.rain;
		
		const pause = () => {
			this.trovaoAudio.pause();
			this.birdAudio.pause();
		};

		setTimeout(function() {
			pause();
		}, 8000);

	}
}