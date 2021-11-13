import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("Throws", () => {
  //Criando as migrations/tabelas antes de executar o teste abaixo
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Some of the fields are empty", async () => {
    const response = await request(app).post("/throw").send({
      id_provider: -1,
      id_offer: -1,
      value: 105,
      amount: -230,
    });

    expect(response.status).toBe(400);
  });

  it("Shoud be able to create a new Throw", async () => {
    const response = await request(app).post("/throw").send({
      id_provider: 1,
      id_offer: 1,
      value: 105,
      amount: 230,
    });

    expect(response.status).toBe(201);
  });

  it("Must be able to not allow the creation of more than one throw for the same offer", async () => {
    const response = await request(app).post("/throw").send({
      id_provider: 1,
      id_offer: 1,
      value: 105,
      amount: 230,
    });

    expect(response.status).toBe(409);
  });

  it("Shoud be able to get all Throws", async () => {
    await request(app).post("/offer").send({
      id_customer: 3,
      from: "Porto Alegre - RS",
      to: "São Paulo - SP",
      initial_value: 130.0,
      amount: 300.0,
      amount_type: "TON",
    });

    await request(app).post("/throw").send({
      id_provider: 3,
      id_offer: 3,
      value: 105,
      amount: 230,
    });

    const response = await request(app).get("/throw");

    expect(response.body.length).toBe(2);
  });

  it("Must be able to fetch a throw by id", async () => {
    const response = await request(app).get("/throw/2");

    expect(response.status).toBe(201);
  });

  it("ID provided for search does not exist", async () => {
    const response = await request(app).get("/throw/10");

    expect(response.status).toBe(404);
  });

  it("Must be able to update a throw", async () => {
    const response = await request(app).put("/throw/2").send({
      value: 140,
      amount: 330,
    });

    expect(response.status).toBe(201);
  });

  it("When updating one or more fields they are empty", async () => {
    const response = await request(app).put("/throw/2").send({
      value: -140,
      amount: -330,
    });

    expect(response.status).toBe(400);
  });

  it("The id provided for the update does not exist", async () => {
    const response = await request(app).put("/throw/20").send({
      value: 140,
      amount: 330,
    });

    expect(response.status).toBe(404);
  });

  it("Must be able to delete a throw by id", async () => {
    const response = await request(app).delete("/throw/2");

    expect(response.status).toBe(201);
  });

  it("ID provided for removal does not exist", async () => {
    const response = await request(app).delete("/throw/29");

    expect(response.status).toBe(404);
  });
});
