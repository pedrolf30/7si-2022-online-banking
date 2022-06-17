import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import TransfersController from "../controllers/TransfersControllers";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const transferRouter = Router();
const transfersController = new TransfersController();

transferRouter.get('/',isAuthenticated,transfersController.index);

transferRouter.get(
    '/:transfer_reference',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            transfer_reference: Joi.string().required(),
        },
    }),
    transfersController.show
);

transferRouter.post(
    '/',
    isAuthenticated,
    celebrate({
        [Segments.BODY]: {
            amount: Joi.number().precision(2).required(),
            receiver: Joi.string().required(),
        }
    }),
    transfersController.create);

export default transferRouter;
