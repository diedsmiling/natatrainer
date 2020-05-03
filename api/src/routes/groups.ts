import * as core from "express-serve-static-core";
import { Request, Response } from "express";
import models from "../models";

function routes(app: core.Express): void {
  app.post("/groups", async (req: Request, res: Response) => {
    const { name } = req.body;
    
    if (typeof name === "undefined") {
      res.status(422).send({ error: "Property name is missing" });
    }

    const result = await models.Group.create({
      name: req.body.name,
    });

    console.log(result);

    res.status(201).end();
  });
}

export default routes;