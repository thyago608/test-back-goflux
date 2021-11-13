import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import { ShippersRepository } from "../repositories/ShipperRepository";
import { OffersRepository } from "../repositories/OfferRepository";

/*
    OFERTA de Transportadora para o Embarcador 
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

class OfferController {
  async create(request: Request, response: Response) {
    const { id_customer, from, to, initial_value, amount, amount_type } =
      request.body;

    //Referência para o repositório de Shippers ( Embarcadores )
    const shipperRepository = getCustomRepository(ShippersRepository);

    const totalRegistersShippers = await shipperRepository.count();

    if (
      id_customer <= 0 ||
      from === "" ||
      to === "" ||
      initial_value <= 0 ||
      amount <= 0 ||
      amount_type === ""
    )
      return response.status(400).json({
        error: "Some of the fields are empty",
      });

    const shipperAlreadyExists = await shipperRepository.findOne({
      id: id_customer,
    });

    if (!shipperAlreadyExists) {
      return response.status(404).json({
        error: "Shipper does not exists!",
      });
    }

    //Referência para o repositório de Offers
    const offerRepository = getCustomRepository(OffersRepository);

    const offerAlreadyExists = await offerRepository.findOne({
      id_customer,
    });

    if (offerAlreadyExists) {
      return response.status(409).json({
        error: "Offer exists",
      });
    }

    //Salvando da tabela Offers
    const offer = offerRepository.create({
      id_customer,
      from,
      to,
      initial_value,
      amount,
      amount_type,
    });

    await offerRepository.save(offer);

    return response.status(201).json({
      message: "Created Offer",
    });
  }

  async show(request: Request, response: Response) {
    //Referência para o repositório de Offers

    const offersRepository = getCustomRepository(OffersRepository);

    const all = await offersRepository.find();

    return response.status(201).json(all);
  }

  async showOne(request: Request, response: Response) {
    const { id } = request.params;

    const offersRepository = getCustomRepository(OffersRepository);

    const offerAlreadyExists = await offersRepository.findOne({
      id: Number(id),
    });

    if (!offerAlreadyExists) {
      return response.status(404).json({
        error: "Offer not exists",
      });
    }

    return response.status(201).json(offerAlreadyExists);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { from, to, initial_value, amount, amount_type } = request.body;

    if (
      from == "" ||
      to == "" ||
      initial_value <= 0 ||
      amount <= 0 ||
      amount_type === ""
    ) {
      return response.status(400).json({
        message: "Some of the fields are empty.",
      });
    }

    const offersRepository = getCustomRepository(OffersRepository);

    const offerAlreadyExists = await offersRepository.findOne({
      id: Number(id),
    });

    //Se o Shipper ( Embarcador) não existir
    if (!offerAlreadyExists) {
      return response.status(404).json({
        error: "The Offer does not exist",
      });
    }

    await offersRepository.update(
      {
        id: Number(id),
      },
      {
        from,
        to,
        initial_value,
        amount,
        amount_type,
      }
    );

    return response.status(201).json({
      message: "Update Offer",
    });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const offerRepository = getCustomRepository(OffersRepository);

    const offerAlreadyExists = await offerRepository.findOne({
      id: Number(id),
    });

    if (!offerAlreadyExists) {
      return response.status(404).json({
        error: "Offer Already Not Exists!",
      });
    }

    await offerRepository.delete({ id: Number(id) });

    return response.status(201).json({
      message: "Offer deleted success!",
    });
  }
}

export { OfferController };
