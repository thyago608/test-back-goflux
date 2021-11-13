import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("Offers", () => {
  //Criando as migrations/tabelas antes de executar o teste abaixo
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Some of the fields are empty", async () => {
    const response = await request(app).post("/offer").send({
      id_customer: 1,
      from: "",
      to: "",
      initial_value: 130,
      amount: 300,
      amount_type: "",
    });

    expect(response.status).toBe(400);
  });

  it("Shoud be able to create a new offer", async () => {
    const response = await request(app).post("/offer").send({
      id_customer: 1,
      from: "Porto Alegre - RS",
      to: "São Paulo - SP",
      initial_value: 130,
      amount: 300,
      amount_type: "TON",
    });

    expect(response.status).toBe(201);
  });

  it("Must be able to not allow the creation of more than one offer for the same shipper", async () => {
    const response = await request(app).post("/offer").send({
      id_customer: 1,
      from: "Porto Alegre - RS",
      to: "São Paulo - SP",
      initial_value: 130.0,
      amount: 300.0,
      amount_type: "TON",
    });

    expect(response.status).toBe(409);
  });

  it("Shoud be able to get all offers", async () => {
    await request(app).post("/shipper").send({
      name: "toGo Brasil",
      doc: "30.420.492/0004-40",
      about:
        "toGo, uma empresa especializada em inovar na contratação de fretes",
      active: true,
      site: "https://toGo.com.br/",
    });

    await request(app).post("/offer").send({
      id_customer: 3,
      from: "Porto Alegre - RS",
      to: "São Paulo - SP",
      initial_value: 130.0,
      amount: 300.0,
      amount_type: "TON",
    });

    const response = await request(app).get("/offer");

    expect(response.body.length).toBe(2);
  });

  it("Must be able to fetch a offer by id", async () => {
    const response = await request(app).get("/offer/2");

    expect(response.status).toBe(201);
  });

  it("ID provided for search does not exist", async () => {
    const response = await request(app).get("/offer/10");

    expect(response.status).toBe(404);
  });

  it("Must be able to update a offer", async () => {
    const response = await request(app).put("/offer/2").send({
      id_customer: 1,
      from: "Porto Alegre - RS",
      to: "São Paulo - SP",
      initial_value: 130.0,
      amount: 300.0,
      amount_type: "TON",
    });

    expect(response.status).toBe(201);
  });

  it("When updating one or more fields they are empty", async () => {
    const response = await request(app).put("/offer/2").send({
      id_customer: 1,
      from: "",
      to: "",
      initial_value: 130,
      amount: 300,
      amount_type: "",
    });

    expect(response.status).toBe(400);
  });

  it("The id provided for the update does not exist", async () => {
    const response = await request(app).put("/offer/20").send({
      id_customer: 1,
      from: "Porto Alegre - RS",
      to: "São Paulo - SP",
      initial_value: 130.0,
      amount: 300.0,
      amount_type: "TON",
    });

    expect(response.status).toBe(404);
  });

  it("Must be able to delete a offer by id", async () => {
    const response = await request(app).delete("/offer/2");

    expect(response.status).toBe(201);
  });

  it("ID provided for removal does not exist", async () => {
    const response = await request(app).delete("/offer/29");

    expect(response.status).toBe(404);
  });
});
