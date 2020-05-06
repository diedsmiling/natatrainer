import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import WordsRoutes from "./routes/words";
import GroupsRoutes from "./routes/groups";

const app = express();
app.use(bodyParser.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.get("/", (_, res) => {
    res.status(200).send("Hello World!");
});

WordsRoutes(app);
GroupsRoutes(app);

app.listen(3000, () => {
  console.log("Started server on port 3000");
});