import axios from "axios";

export default class AptController {

	constructor() {
		this.getApts = this.getApts.bind(this);
		this.moneyAudio = new Audio("/assets/audio/money.mp3");
	}

	async getApts() {
		
		let response;

		try {
			response = await axios.get("/objects/apts.json");
		} catch(error) {
			console.log(error);
		}
		return JSON.parse(JSON.stringify(response.data));

	}

	cleanAfd(){
		const afdItens = Array.from(document.querySelectorAll("[afd-item]"));
		const inputPassword = document.querySelector("[input-passoword]");
		inputPassword.value = "";

		afdItens.forEach(item => {
			item.classList.remove('--error');
			item.classList.remove('--success');
		});		
	}


	prepareItemHtml(item) {
		let html = "";
		html += "<li apt-item class='item'>";
		html += "<input type='radio' class='radio' name='item' id='" + item.code + "' value='" + item.code + "'>";
		html += "<label for='" + item.code + "'><img class='image' src='" + item.src + "' ></label>";
		html += "<span class='description'>";
		html += "<p class='name'>" + item.name + "</p>";
		html +=	"</span>";
		html += "</li>";

		return html;
	}

	open() {
		const machine = document.querySelector(".machine-wrapper.--login");
		machine.classList.remove("--hide");
	}

	async authenticate(e, form) {
		const { item, password } = form;
		const response = await axios.get("/objects/apts.json");
		const apts = JSON.parse(JSON.stringify(response.data))
		const apt = apts.data.filter(apt => apt.code == item.value)[0];
		const data = { password: password.value, length: password.value.length };
		const { length } = password.value;

		if(apt.password.split("")[length] == e.key)
			return { password: password.value + e.key, length: password.value.length + 1, validated: true };

		return { ...data, validated: false};

	}

	buy(e) {
		e.preventDefault();
		this.moneyAudio.play();

		setTimeout(function() {
			const machine = document.querySelector(".machine-wrapper.--buyed");
			const feed = document.querySelector(".machine-wrapper.--feedback");
			machine.classList.add("--hide");	
			feed.classList.remove("--hide");
		}, 500);
	}

	renderSuccess(length) {
		const afdItens = Array.from(document.querySelectorAll("[afd-item]"));
		console.log(afdItens);
		afdItens.slice(0, length).forEach(item => {
			item.classList.remove('--error');
			item.classList.add('--success');
		});
	}

	renderError(length) {
		const item = document.querySelectorAll("[afd-item]")[length];	
		item.classList.add('--error');
	}

	openAfd(){
		const item = document.querySelector("[afd]");	
		item.classList.add('--open');
	}

	close() {
		const feed = document.querySelector(".machine-wrapper.--feedback");
		const item = document.querySelector("[afd]");	
		item.classList.add('--open');
		feed.classList.add("--hide");	
		this.cleanAfd();
	}

}