export default class AppController {
	index(resquest, response) {
		const data = { title: "Projeto Loop - Elevador" };
		return response.status(200).render("index", { data });
	}
}