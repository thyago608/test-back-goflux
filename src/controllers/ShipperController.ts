import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ShippersRepository } from "../repositories/ShipperRepository";
import { TransportersRepository } from "../repositories/TransporterRepository";

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

    //Se algum dos campos estiverem vazios
    if (name == "" || doc == "" || about === "" || site === "" || !active) {
      return response.status(400).json({
        message: "Some of the fields are empty.",
      });
    }

    //Acessando o repositório de Shippers
    const shippersRepository = getCustomRepository(ShippersRepository);

    //SELECT * FROM shippers WHERE doc = doc
    const shipperAlreadyExists = await shippersRepository.findOne({
      doc,
    });

    //Se existir um registro com o mesmo doc que veio na requisição
    if (shipperAlreadyExists) {
      return response.status(409).json({
        error: "Shipper already exists!",
      });
    }

    //Acessando o respositório de Transporter
    const transporterRepository = getCustomRepository(TransportersRepository);

    //SELECT * FROM transporters WHERE doc = doc
    const transporterAlreadyExists = await transporterRepository.findOne({
      doc,
    });

    //Se existir um registro com o mesmo doc que veio na requisição
    if (transporterAlreadyExists) {
      return response.status(422).json({
        error: "There cannot be a shipper with the same doc as a carrier",
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

    return response.status(201).json(all);
  }

  async showOne(request: Request, response: Response) {
    const { id } = request.params;

    const shipperRepository = getCustomRepository(ShippersRepository);

    const shipperAlreadyExists = await shipperRepository.findOne({
      id: Number(id),
    });

    if (!shipperAlreadyExists) {
      return response.status(404).json({
        error: "Shipper not exists",
      });
    }

    return response.status(201).json(shipperAlreadyExists);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, doc, about, site, active } = request.body;

    if (name == "" || doc == "" || about === "" || site === "" || !active) {
      return response.status(400).json({
        error: "Some of the fields are empty.",
      });
    }

    const shipperRepository = getCustomRepository(ShippersRepository);

    const shipperAlreadyExists = await shipperRepository.findOne({
      id: Number(id),
    });

    //Se o Shipper ( Embarcador) não existir
    if (!shipperAlreadyExists) {
      return response.status(404).json({
        error: "The Shipper does not exist",
      });
    }

    const transportersRepository = getCustomRepository(TransportersRepository);

    const transporterAlreadyExists = await transportersRepository.findOne({
      doc,
    });

    if (transporterAlreadyExists) {
      return response.status(422).json({
        error: "There cannot be a shipper with the same document as a carrier",
      });
    }

    await shipperRepository.update(
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
      message: "Update Shipper",
    });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const shipperRepository = getCustomRepository(ShippersRepository);

    const shipperAlreadyExists = await shipperRepository.findOne({
      id: Number(id),
    });

    if (!shipperAlreadyExists) {
      return response.status(404).json({
        error: "Shipper Already Not Exists",
      });
    }

    await shipperRepository.delete({ id: Number(id) });

    return response.status(201).json({
      message: "Shipper deleted success!",
    });
  }
}

export { ShipperController };
