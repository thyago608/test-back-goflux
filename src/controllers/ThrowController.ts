import { Request, Response } from 'express';

/*
    {
    "id_provider": 12,
    "id_offer": 1,
    "value": 105.00,
    "amount": 230.00
    }

*/

class ThrowController{
    async create(request:Request, response:Response){

        return response.json({
            message:"Created Throw"
        });
    }
}

export { ThrowController }