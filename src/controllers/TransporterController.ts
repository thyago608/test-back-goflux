import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import { TransportersRepository } from "../repositories/TransporterRepository";
import { ShippersRepository } from "../repositories/ShipperRepository";

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

    //Se algum dos campos estiverem vazios
    if (name == "" || doc == "" || about === "" || site === "" || !active) {
      return response.status(400).json({
        error: "Some of the fields are empty.",
      });
    }

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

    const shipperRepository = getCustomRepository(ShippersRepository);

    const shipperAlreadyExists = await shipperRepository.findOne({
      doc,
    });

    if (shipperAlreadyExists) {
      return response.status(400).json({
        error: "There cannot be a carrier with the same document as a shipper",
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

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, doc, about, site, active } = request.body;

    if (name == "" || doc == "" || about === "" || site === "" || !active) {
      return response.status(400).json({
        message: "Some of the fields are empty.",
      });
    }

    const transportersRepository = getCustomRepository(TransportersRepository);

    const transportersAlreadyExists = await transportersRepository.findOne({
      id: Number(id),
    });

    if (!transportersAlreadyExists) {
      return response.status(400).json({
        error: "The Transporters does not exist",
      });
    }

    const shipperRepository = getCustomRepository(ShippersRepository);

    const shipperAlreadyExists = await shipperRepository.findOne({
      doc,
    });

    if (shipperAlreadyExists) {
      return response.status(400).json({
        error: "There cannot be a carrier with the same document as a shipper",
      });
    }

    await transportersRepository.update(
      {
        id: Number(id),
      },
      {
        name,
        doc,
        about,
        site,
        active,
      }
    );

    return response.status(201).json({
      message: "Update Transpoter",
    });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const transporterRepository = getCustomRepository(TransportersRepository);

    const transporterAlreadyExists = await transporterRepository.findOne({
      id: Number(id),
    });

    if (!transporterAlreadyExists) {
      return response.status(400).json({
        error: "Transporter Already Not Exists",
      });
    }

    await transporterRepository.delete({ id: Number(id) });

    return response.status(201).json({
      message: "Transporter deleted success!",
    });
  }
}

export { TransporterController };
