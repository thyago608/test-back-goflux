import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import { TransportersRepository } from "../repositories/TransporterRepository";

/*

{
  "id": 12,
  "name": "Transportadora Rodoclub",
  "doc": "99.974.145/0001-50",
  "about": "Transportadora Rodoclub, transportando sonhos",
  "active": true,
  "site": "https://goflux.com.br/"
}

*/

class TransporterController {
  async create(request: Request, response: Response) {
    //Pegando informações da requisição
    const { name, doc, about, active, site } = request.body;

    //Acessando o repositório
    const transporterRepository = getCustomRepository(TransportersRepository);

    const transporterAlreadyExists = await transporterRepository.findOne({
      doc,
    });

    if (transporterAlreadyExists) {
      return response.status(400).json({
        error: "Transporter already exists!",
      });
    }

    const transporter = transporterRepository.create({
      name,
      doc,
      about,
      site,
      active,
    });

    await transporterRepository.save(transporter);

    return response.status(201).json({
      message: "Transporter Created Successfully",
    });
  }

  async show(request: Request, response: Response) {
    //Acessando o repositório de Transporter
    const transporterRepository = getCustomRepository(TransportersRepository);

    const all = await transporterRepository.find();

    return response.status(201).json(all);
  }

  async showOne(request: Request, response: Response) {
    const { id } = request.params;

    const transporterRepository = getCustomRepository(TransportersRepository);

    const transporterAlreadyExists = await transporterRepository.findOne({
      id: Number(id),
    });

    if (!transporterAlreadyExists) {
      return response.status(400).json({
        error: "Transporter not exists",
      });
    }

    return response.status(201).json(transporterAlreadyExists);
  }
}

export { TransporterController };
