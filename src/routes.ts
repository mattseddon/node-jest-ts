import * as express from "express";
import * as bodyParser from "body-parser";

import Movies from "./api/Movies";

const app = express();
const movies = new Movies();

app.use(bodyParser.json());

app.post("/movies", (req: express.Request, res: express.Response) => {
    res.json(movies.create(req.body));
});

app.get("/movies", (req: express.Request, res: express.Response) => {
    res.json(movies.findMany());
});

app.get("/test", (req: express.Request, res: express.Response) => {
    res.json({ message: "pass!" });
});

module.exports = app;
