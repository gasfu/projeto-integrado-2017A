import smoothScroll from "smoothScroll";

export default class ElevadorController {

	static move(section, value) {
		const control = document.querySelector("[control]");
		control.classList.add("--hide");

		const time = Math.abs(window.localStorage.getItem("floor") - value) * 2000;
		console.log(time);
		section = document.querySelector(`#${section}`);

		smoothScroll(section, time);
		window.localStorage.setItem("floor", value);
		setTimeout(() => {
			control.classList.remove("--hide")
		}, time);
	}
}