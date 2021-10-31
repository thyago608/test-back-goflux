import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { Shipper } from '../models/Shipper';
import { ShippersRepository } from '../repositories/ShipperRepository';

/*
    {
    "id": 1,
    "name": "goFlux Brasil",
    "doc": "60.429.484/0001-10",
    "about": "goFlux, uma empresa especializada em inovar na contratação de fretes",
    "active": true,
    "site": "https://goflux.com.br/"
}
*/

class ShipperController{
    async create(request:Request, response:Response){
        
        //Pegando as informações da requisição
        const {
            name,
            doc,
            about,
            active,
            site
        } = request.body;
        
        //Criando um repositório
        const shippersRepository = getCustomRepository(ShippersRepository);

        //SELECT * FROM shippers WHERE doc = doc
        const shipperAlreadyExists = await shippersRepository.findOne({
            doc
        });

        if(shipperAlreadyExists){
            Shipper.nextId--;
            
            return response.status(400).json({
                error: "User already exists!"
            })
        }

        const shipper = shippersRepository.create({
            name,
            doc,
            about,
            active,
            site
        });

        await shippersRepository.save(shipper);


        response.status(200).json({
            shipper,
            message:"Shipper Created"
        });
    }
}

export { ShipperController }