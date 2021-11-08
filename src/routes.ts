import express from "express";
import { ShipperController } from "./controllers/ShipperController";
import { TransporterController } from "./controllers/TransporterController";
import { OfferController } from "./controllers/OfferController";
import { ThrowController } from "./controllers/ThrowController";

const routes = express.Router();
const shipperController = new ShipperController();
const transporterController = new TransporterController();
const offerController = new OfferController();
const throwsController = new ThrowController();

routes.post("/shipper", shipperController.create);
routes.get("/shipper", shipperController.show);
routes.get("/shipper/:id", shipperController.showOne);

routes.post("/transporter", transporterController.create);
routes.get("/transporter", transporterController.show);
routes.get("/transporter/:id", transporterController.showOne);

routes.post("/offer", offerController.create);
routes.get("/offer", offerController.show);
routes.get("/offer/:id", offerController.showOne);

routes.post("/throw", throwsController.create);
routes.get("/throw", throwsController.show);
routes.get("/throw/:id", throwsController.showOne);

export default routes;
