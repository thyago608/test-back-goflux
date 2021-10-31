import express from 'express';
import { ShipperController } from './controllers/ShipperController';
import { TransporterController } from './controllers/TransporterController';

const routes = express.Router();
const shipperController = new ShipperController();
const transporterController = new TransporterController();

routes.post('/shipper', shipperController.create);
routes.get('/shipper', shipperController.show);

routes.post('/transporter', transporterController.create);
routes.get('/transporter', transporterController.show);


export default routes;



