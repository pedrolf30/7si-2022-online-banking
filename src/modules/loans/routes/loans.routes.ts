import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import LoanController from "../controllers/LoanControllers";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const loanRouter = Router();
const loanController = new LoanController();

loanRouter.get('/',isAuthenticated,loanController.index);

loanRouter.get(
    '/:loan_reference',
    celebrate({
        [Segments.PARAMS]: {
            loan_reference: Joi.string().required(),
        },
    }),
    loanController.show
);

loanRouter.post(
    '/',
    isAuthenticated,
    celebrate({
        [Segments.BODY]: {
            amount: Joi.number().precision(2).required(),
            installments: Joi.number().integer().min(1).max(24).required(),
            finality: Joi.string().valid(
                'travel',
                'debts',
                'education',
                'investments',
                'medical_expenses',
            ).required(),
        }
    }),
    loanController.create);

export default loanRouter;
