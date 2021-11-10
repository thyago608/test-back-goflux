import { Request, Response } from "express";
import { getCustomRepository, getConnection } from "typeorm";
import { OffersRepository } from "../repositories/OfferRepository";
import { ThrowsRepository } from "../repositories/ThrowRepository";

/*
    {
    "id_provider": 12,
    "id_offer": 1,
    "value": 105.00,
    "amount": 230.00
    }

    */

class ThrowController {
  async create(request: Request, response: Response) {
    const { id_provider, id_offer, value, amount } = request.body;

    if (id_provider <= 0 || id_offer <= 0 || value <= 0 || amount <= 0) {
      return response.status(400).json({
        message: "Some of the fields are empty.",
      });
    }

    //Referência para o repositório de Offers (Ofertas)
    const offersRepository = getCustomRepository(OffersRepository);

    const offerAlreadyExists = await offersRepository.findOne({
      id: id_offer,
      id_customer: id_provider,
    });

    if (offerAlreadyExists) {
      return response.status(400).json({
        error: "Throw already exists",
      });
    }

    const throwRepository = getCustomRepository(ThrowsRepository);

    const bidForOffer = throwRepository.create({
      id_provider,
      id_offer,
      value,
      amount,
    });

    await throwRepository.save(bidForOffer);

    return response.status(201).json({
      message: "Throw created for Offer",
    });
  }

  async show(request: Request, response: Response) {
    const throwRepository = getCustomRepository(ThrowsRepository);

    const all = await throwRepository.find();

    return response.status(201).json(all);
  }

  async showOne(request: Request, response: Response) {
    const { id } = request.params;

    const throwRepository = getCustomRepository(ThrowsRepository);

    const throwAlreadyExists = await throwRepository.findOne({
      id: Number(id),
    });

    if (!throwAlreadyExists) {
      return response.status(400).json({
        error: "Throw not exists",
      });
    }

    return response.status(201).json(throwAlreadyExists);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { value, amount } = request.body;

    if (value <= 0 || amount <= 0) {
      return response.status(400).json({
        message: "Some of the fields are empty.",
      });
    }

    const throwsRepository = getCustomRepository(ThrowsRepository);

    const throwsAlreadyExists = await throwsRepository.findOne({
      id: Number(id),
    });

    if (!throwsAlreadyExists) {
      return response.status(400).json({
        error: "The Throws does not exist",
      });
    }

    await throwsRepository.update(
      {
        id: Number(id),
      },
      {
        value,
        amount,
      }
    );

    return response.status(201).json({
      message: "Update Throw",
    });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const throwsRepository = getCustomRepository(ThrowsRepository);

    const throwAlreadyExists = await throwsRepository.findOne({
      id: Number(id),
    });

    if (!throwAlreadyExists) {
      return response.send(400).json({
        error: "Throw Already Not Exists!",
      });
    }

    await throwsRepository.delete({ id: Number(id) });

    return response.send(201).json({
      message: "Throw deleted success!",
    });
  }
}

export { ThrowController };
