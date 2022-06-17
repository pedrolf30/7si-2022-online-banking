import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import AccountsController from "../controllers/AccountsController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const accountsRouter = Router();
const accountsController = new AccountsController();

accountsRouter.get(
    '/',
    isAuthenticated,
    accountsController.show
);

accountsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            password: Joi.string().required(),
            password_2: Joi.string().required(),
            account_type: Joi.string().required().valid('checking_account', 'saving_account'),
            customer_id: Joi.number().required(),
        }
    }),
    accountsController.create);

accountsRouter.put(
    '/',
    isAuthenticated,
    celebrate({
        [Segments.BODY]: {
            password: Joi.string().required(),
            password_2: Joi.string().required(),
        },
    }),
    accountsController.update);

export default accountsRouter;
