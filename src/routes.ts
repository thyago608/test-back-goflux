import express from 'express';
import { ShipperController } from './controllers/ShipperController';

const routes = express.Router();
const shipperController = new ShipperController();

routes.post('/shipper', shipperController.create);


export default routes;



