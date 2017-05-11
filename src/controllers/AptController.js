import axios from "axios";

export default class AptController {

	constructor() {
		this.getApts = this.getApts.bind(this);
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

	prepareItemHtml(item) {
		let html = "";
		html += "<li class='item'>";
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

	async authenticate(e) {
		e.preventDefault();
		const { item, password } = e.target;
		const response = await axios.get("/objects/apts.json");
		
		const apts = JSON.parse(JSON.stringify(response.data));
		const validate = apt => apt.code == item.value && apt.password == password.value;
		
		console.log(apts);

		const isValid = apts.data.filter(validate);
		return !!isValid.length;
	}

}