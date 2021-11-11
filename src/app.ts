import "reflect-metadata";
import express from "express";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import createConnection from "./database";

createConnection();
const app = express();

app.use(express.json());
app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/terms", (request, response) => {
  return response.json({
    message: "Termos de Serviço",
  });
});

export { app };
