import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.get("/", (_, res) => {
    res.status(200).send("Hello World!");
});

app.listen(3000, () => {
  console.log("Started server on por 3000");
});