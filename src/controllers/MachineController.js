import axios from "axios";

export default class MachineController {
	
	constructor() {
	}

	async getProducts() {
		
		let response;

		try {
			response = await axios.get("/objects/products.json");
		} catch(error) {
			console.log(error);
		}

		return JSON.parse(JSON.stringify(response.data));

	}

	prepareItemHtml(item) {
		let html = "";
		html += "<li class='item'>";
		html += "<input type='radio' class='radio' name='item' id='" + item.code + "'>";
		html += "<label apts-item for='" + item.code + "'><img class='image' src='" + item.src + "' ></label>";
		html += "<span class='description'>";
		html += "<p class='name'>" + item.name + "</p>";
		html += "<p class='prace'>R$ " + item.prace.toFixed(2).replace(".", ",") + "</p>";
		html +=	"</span>";
		html += "</li>";

		return html;
	}

	open() {
		setTimeout(() => {
			const machine = document.querySelector(".machine-wrapper");
			const auth = document.querySelector(".machine-wrapper.--login");
			auth.classList.add("--hide");
			machine.classList.remove("--hide");
		}, 1000);
	}
}