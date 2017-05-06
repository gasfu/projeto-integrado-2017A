import AppController from "../src/controllers/AppController";

const routes = (app) => {
	app.get("/", new AppController().index);
};

export default routes;