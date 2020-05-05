import * as core from "express-serve-static-core";
import { Request, Response } from "express";
import { head } from "lodash";
import halson from "halson";
import { CREATED, NOT_FOUND, OK, UNPROCESSABLE_ENTITY } from  "../constants/statusCodes";
import { conditionalError } from "../helpers";
import models from "../models";

function routes(app: core.Express): void {
  app.post("/groups", async (req: Request, res: Response) => {
    const { name } = req.body;
    const Group = new models.Group({ name});
    
    try {
      const result = await Group.save();
      const resource = halson(result.get()).addLink("self", `/posts/${result.id}`);
      res.status(CREATED).send(resource);
    } catch(e) {
      const error = head(e.errors);
      const resultedError = conditionalError(error, UNPROCESSABLE_ENTITY);
      res.status(resultedError.code).send(resultedError.message);
    }
  });

  app.delete("/groups/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const result = await models.Group.destroy({ where: { id } });
      res.status(result > 0 ? OK : NOT_FOUND).end();
    } catch(e) {
      const error = head(e.errors);
      const resultedError = conditionalError(error, UNPROCESSABLE_ENTITY);      
      res.status(resultedError.code).send(resultedError.message);
    }
  });
}

export default routes;