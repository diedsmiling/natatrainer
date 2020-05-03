import * as core from "express-serve-static-core";
import models from "../models";
function routes(app: core.Express): void {
  app.get("/words", (_, res) => {
    console.log(models.Word.find);
    models.Word.create({
      valueNative: "sd",
      valueForiegn: "sss"
    }).then(function() {
      res.redirect('/');
    });
  });
}

export default routes;