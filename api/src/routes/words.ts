import * as core from "express-serve-static-core";
import { Request, Response } from "express";
import { head, isNil } from "lodash";
import halson from "halson";
import { CREATED, NOT_FOUND, OK, UNPROCESSABLE_ENTITY } from  "../constants/statusCodes";
import { conditionalError } from "../helpers";
import models from "../models";

function routes(app: core.Express): void {
  app.post("/words", async (req: Request, res: Response) => {
    const { valueNative, valueForeign, groupId } = req.body;
    const Word = new models.Word({ valueNative, valueForeign, groupId });
  
    try {
      const result = await Word.save();
      const resource = halson(result.get()).addLink("self", `/words/${result.id}`);
      res.status(CREATED).send(resource);
    } catch(e) {
      console.log(e.message);
      const error = head(e.errors);
      const resultedError = conditionalError(error, UNPROCESSABLE_ENTITY);
      res.status(resultedError.code).send(resultedError.message);
    }
  });

  app.patch("/words/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { valueNative, valueForeign, groupId, failed, answered } = req.body;
      const Word = await models.Word.findByPk(id);
      
      if (!Word) {
        res.status(NOT_FOUND).end();
      }

      console.log({ valueNative, valueForeign, groupId, failed, answered });

      Word.valueNative = !isNil(valueNative) ? valueNative : Word.valueNative;
      Word.valueForeign = !isNil(valueForeign) ? valueForeign : Word.valueForeign;
      Word.groupId = !isNil(groupId) ? groupId : Word.groupId;
      Word.failed = !isNil(failed) ? failed : Word.failed;
      Word.answered = !isNil(answered) ? answered : Word.answered;

      const result = await Word.save();
      const resource = halson(result.get()).addLink("self", `/words/${result.id}`);
      res.status(OK).send(resource);
    } catch(e) {
      console.log(e);
      const error = head(e.errors);
      const resultedError = conditionalError(error, UNPROCESSABLE_ENTITY);
      res.status(resultedError.code).send(resultedError.message);
    }
  });

  app.delete("/words/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const result = await models.Word.destroy({ where: { id } });
      res.status(result > 0 ? OK : NOT_FOUND).end();
    } catch(e) {
      console.log(e);
      const error = head(e.errors);
      const resultedError = conditionalError(error, UNPROCESSABLE_ENTITY);      
      res.status(resultedError.code).send(resultedError.message);
    }
  });
}

export default routes;