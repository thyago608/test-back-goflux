import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe("Shippers",()=>{
    //Criando as migrations/tabelas antes de executar o teste abaixo
    beforeAll(async()=>{
        const connection = await createConnection();
        await connection.runMigrations();
    })

    it("Shoud be able to create a new transporter",async()=>{
        const response = await request(app).post('/transporter').send({
            name: "example Brasil",
            doc: "00.000.000/0000-00",
            about: "example, uma empresa especializada em inovar na contratação de fretes",
            active: true,
            site: "https://example.com.br/" 
        });

        expect(response.status).toBe(201);
    });

    it("Shoud not be able to create a transporter with exists cnpj", async()=>{
        const response = await request(app).post('/transporter').send({
            name: "example Brasil",
            doc: "00.000.000/0000-00",
            about: "example, uma empresa especializada em inovar na contratação de fretes",
            active: true,
            site: "https://example.com.br/" 
        });

        expect(response.status).toBe(400);

    })

    it("Shoud be able to get all transporters", async()=>{
         await request(app).post('/transporter').send({
            name: "Example EUA",
            doc: "01.123.456/0000-01",
            about: "example, uma empresa especializada em inovar na contratação de fretes",
            active: true,
            site: "https://example.com.br/" 
        });

        const response = await request(app).get('/transporter');

        expect(response.body.length).toBe(2);
    })
   
});