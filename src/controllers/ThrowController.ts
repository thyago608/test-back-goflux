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

    try {
      //Referência para o repositório de Offers (Ofertas)
      const offersRepository = getCustomRepository(OffersRepository);

      const offerAlreadyExists = await offersRepository.findOne({
        id: id_offer,
        id_customer: id_provider,
      });

      console.log(offerAlreadyExists);

      //Se não existe oferta
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
    } catch {}

    return response.status(201).json({
      message: "Created Throw",
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

  async update(request: Request, response: Response) {}

  //   async update(request: Request, response: Response) {
  //     const { id_throw, id_provider, id_offer, value, amount } = request.body;

  //     const { id } = request.query;

  //     // const throwRepository = getCustomRepository(ThrowsRepository);

  //     // const bidForOfferAlReadyExists = await throwRepository.findOne({
  //     //   id: id_throw,
  //     //   id_provider,
  //     //   id_offer,
  //     // });

  //     // if (!bidForOfferAlReadyExists) {
  //     //   return response.status(400).json({
  //     //     message: "Bid Doesn't Exist",
  //     //   });
  //     // }

  //     // await throwRepository.update(
  //     //   {
  //     //     id: id_throw,
  //     //   },
  //     //   {
  //     //     id_provider,
  //     //     id_offer,
  //     //     value,
  //     //     amount,
  //     //   }
  //     // );
  //     return response.status(201).json({ message: `Hello ${id}` });
  //   }

  async delete(request: Request, response: Response) {}
}

export { ThrowController };
