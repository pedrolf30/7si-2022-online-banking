import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import CustomerController from "../controllers/CustomersController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const customersRouter = Router();
const customersController = new CustomerController();

customersRouter.get(
    '/',
    isAuthenticated,
    customersController.show
);

customersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            phone: Joi.string().required(),
            cpf: Joi.string().required(),
            rg: Joi.string().required(),
            birthdate: Joi.string().required(),
        }
    }),
    customersController.create);

customersRouter.put(
    '/:searchEmail',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            searchEmail: Joi.string().required().email(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            phone: Joi.string().required(),
            cpf: Joi.string().required(),
            rg: Joi.string().required(),
            birthdate: Joi.string().required(),
        }
    }),
    customersController.update);

export default customersRouter;
