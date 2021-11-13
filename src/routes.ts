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
routes.put("/shipper/:id", shipperController.update);
routes.delete("/shipper/:id", shipperController.delete);

routes.post("/transporter", transporterController.create);
routes.get("/transporter", transporterController.show);
routes.get("/transporter/:id", transporterController.showOne);
routes.put("/transporter/:id", transporterController.update);
routes.delete("/transporter/:id", transporterController.delete);

routes.post("/offer", offerController.create);
routes.get("/offer", offerController.show);
routes.get("/offer/:id", offerController.showOne);
routes.put("/offer/:id", offerController.update);
routes.delete("/offer/:id", offerController.delete);

routes.post("/throw", throwsController.create);
routes.get("/throw", throwsController.show);
routes.get("/throw/:id", throwsController.showOne);
routes.put("/throw/:id", throwsController.update);
routes.delete("/throw/:id", throwsController.delete);

export default routes;
