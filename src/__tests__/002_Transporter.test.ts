import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("Transportes", () => {
  //Criando as migrations/tabelas antes de executar o teste abaixo
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Some of the fields are empty", async () => {
    const response = await request(app).post("/transporter").send({
      name: "",
      doc: "",
      about: "",
      active: true,
      site: "",
    });

    expect(response.status).toBe(400);
  });

  it("Shoud be able to create a new transporter", async () => {
    const response = await request(app).post("/transporter").send({
      name: "Transportadora Rodoclub",
      doc: "99.974.145/0001-50",
      about: "Transportadora Rodoclub, transportando sonhos",
      active: true,
      site: "https://goflux.com.br/",
    });

    expect(response.status).toBe(201);
  });

  it("Must be able to not let create a sender with the existing document", async () => {
    const response = await request(app).post("/transporter").send({
      name: "Transportadora Rodoclub",
      doc: "99.974.145/0001-50",
      about: "Transportadora Rodoclub, transportando sonhos",
      active: true,
      site: "https://goflux.com.br/",
    });

    expect(response.status).toBe(409);
  });

  it("Shoud be able to get all transporters", async () => {
    await request(app).post("/transporter").send({
      name: "Example EUA",
      doc: "01.123.456/0000-01",
      about:
        "example, uma empresa especializada em inovar na contratação de fretes",
      active: true,
      site: "https://example.com.br/",
    });

    const response = await request(app).get("/transporter");

    expect(response.body.length).toBe(2);
  });

  it("Must be able to fetch a Transporter by id", async () => {
    const response = await request(app).get("/transporter/1");

    expect(response.status).toBe(201);
  });

  it("ID provided for search does not exist", async () => {
    const response = await request(app).get("/transporter/10");

    expect(response.status).toBe(404);
  });

  it("Must be able to update a Transporter", async () => {
    const response = await request(app).put("/transporter/2").send({
      name: "Transportadora Caminho Feliz",
      doc: "99.933.113/0001-50",
      about: "Transportadora Caminho Feliz, transportando sonhos",
      active: true,
      site: "https://caminhofeliz.com.br/",
    });

    expect(response.status).toBe(201);
  });

  it("When updating one or more fields they are empty", async () => {
    const response = await request(app).put("/transporter/2").send({
      name: "",
      doc: "",
      about: "",
      active: true,
      site: "https://goflex.com.br/",
    });

    expect(response.status).toBe(400);
  });

  it("The id provided for the update does not exist", async () => {
    const response = await request(app).put("/transporter/20").send({
      name: "Transportadora Brasil",
      doc: "60.460.489/0001-10",
      about:
        "Transportadora Brasil, uma empresa especializada em inovar na contratação de fretes",
      active: true,
      site: "https://goflex.com.br/",
    });

    expect(response.status).toBe(404);
  });

  it("Must be able to delete a Transporter", async () => {
    const response = await request(app).delete("/transporter/2");

    expect(response.status).toBe(201);
  });

  it("ID provided for removal does not exist", async () => {
    const response = await request(app).delete("/transporter/29");

    expect(response.status).toBe(404);
  });
});
