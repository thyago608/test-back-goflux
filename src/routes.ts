import express from "express";

const routes = express.Router();

routes.get("/", (resquest, response) => {
  const data = [
    { id: 1, name: "Thyago", surname: "Ribeiro" },
    { id: 2, name: "Rafael", surname: "Aires" },
  ];

  response.json(data);
});

export default routes;
