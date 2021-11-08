import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ShippersRepository } from "../repositories/ShipperRepository";

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

class ShipperController {
  async create(request: Request, response: Response) {
    //Pegando as informações da requisição
    const { name, doc, about, active, site } = request.body;

    //Acessando o repositório de Shippers
    const shippersRepository = getCustomRepository(ShippersRepository);

    //SELECT * FROM shippers WHERE doc = doc
    const shipperAlreadyExists = await shippersRepository.findOne({
      doc,
    });

    if (shipperAlreadyExists) {
      return response.status(400).json({
        error: "Shipper already exists!",
      });
    }

    const shipper = shippersRepository.create({
      name,
      doc,
      about,
      active,
      site,
    });

    await shippersRepository.save(shipper);

    response.status(201).json({
      message: "Shipper Created Successfully",
    });
  }

  async show(request: Request, response: Response) {
    //Acessando o repositório de Shippers
    const shippersRepository = getCustomRepository(ShippersRepository);

    const all = await shippersRepository.find();

    return response.json(all);
  }

  async showOne(request: Request, response: Response) {
    const { id } = request.params;

    const shipperRepository = getCustomRepository(ShippersRepository);

    const shipperAlreadyExists = await shipperRepository.findOne({
      id: Number(id),
    });

    if (!shipperAlreadyExists) {
      return response.status(400).json({
        error: "Shipper not exists",
      });
    }

    return response.status(201).json(shipperAlreadyExists);
  }
}

export { ShipperController };
