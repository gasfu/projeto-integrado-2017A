import express from "express";
import path from "path";
import routes from "./routes";

const app = express();

app.set("trust proxy", 1);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use("/", express.static("public"));

routes(app);

const port = 8888;

app.listen(port, err => {
	if(err) console.log(err);
	else console.log(`Server online - Listening to port ${port}`);
});