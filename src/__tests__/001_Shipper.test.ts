import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("Shippers", () => {
  //Criando as migrations/tabelas antes de executar o teste abaixo
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Some of the fields are empty", async () => {
    const response = await request(app).post("/shipper").send({
      name: "",
      doc: "",
      about: "",
      active: true,
      site: "",
    });

    expect(response.status).toBe(400);
  });

  it("Shoud be able to create a new shipper", async () => {
    const response = await request(app).post("/shipper").send({
      name: "goFlux Brasil",
      doc: "60.429.484/0001-10",
      about:
        "goFlux, uma empresa especializada em inovar na contratação de fretes",
      active: true,
      site: "https://goflux.com.br/",
    });

    expect(response.status).toBe(201);
  });

  it("Must be able to not let create a sender with the existing document", async () => {
    const response = await request(app).post("/shipper").send({
      name: "goFlux Brasil",
      doc: "60.429.484/0001-10",
      about:
        "goFlux, uma empresa especializada em inovar na contratação de fretes",
      active: true,
      site: "https://goflux.com.br/",
    });

    expect(response.status).toBe(409);
  });

  it("Shoud be able to get all shippers", async () => {
    await request(app).post("/shipper").send({
      name: "Example EUA",
      doc: "09.999.111/0000-01",
      about:
        "example, uma empresa especializada em inovar na contratação de fretes",
      active: true,
      site: "https://example.com.br/",
    });

    const response = await request(app).get("/shipper");

    expect(response.body.length).toBe(2);
  });

  it("Must be able to fetch a shipper by id", async () => {
    const response = await request(app).get("/shipper/1");

    expect(response.status).toBe(201);
  });

  it("ID provided for search does not exist", async () => {
    const response = await request(app).get("/shipper/10");

    expect(response.status).toBe(404);
  });

  it("Must be able to update a shipper", async () => {
    const response = await request(app).put("/shipper/2").send({
      name: "goFlex Brasil",
      doc: "60.400.484/0001-10",
      about:
        "goFlex, uma empresa especializada em inovar na contratação de fretes",
      active: true,
      site: "https://goflex.com.br/",
    });

    expect(response.status).toBe(201);
  });

  it("When updating one or more fields they are empty", async () => {
    const response = await request(app).put("/shipper/2").send({
      name: "",
      doc: "",
      about: "",
      active: true,
      site: "https://goflex.com.br/",
    });

    expect(response.status).toBe(400);
  });

  it("The id provided for the update does not exist", async () => {
    const response = await request(app).put("/shipper/20").send({
      name: "goFlex Brasil",
      doc: "60.460.489/0001-10",
      about:
        "goFlex, uma empresa especializada em inovar na contratação de fretes",
      active: true,
      site: "https://goflex.com.br/",
    });

    expect(response.status).toBe(404);
  });

  it("Must be able to delete a shipper by id", async () => {
    const response = await request(app).delete("/shipper/2");

    expect(response.status).toBe(201);
  });

  it("ID provided for removal does not exist", async () => {
    const response = await request(app).delete("/shipper/29");

    expect(response.status).toBe(404);
  });
});
