import { Request, Response } from 'express';

/*

{
  "id": 1,
  "id_customer": 1,
  "from": "Porto Alegre - RS",
  "to": "São Paulo - SP",
  "initial_value": 130.00,
  "amount": 300.00,
  "amount_type": "TON"
}

*/

class OfferController{
    async create(request:Request, response:Response){
        return response.status(201).json({
            message:"Created Offer"
        });
    }
}

export { OfferController }