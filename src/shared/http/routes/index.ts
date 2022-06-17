import { response, Router } from 'express';
import accountsRouter from '../../../modules/accounts/routes/accounts.routes';
import sessionsRouter from '../../../modules/accounts/routes/sessions.routes';
import customersRouter from '../../../modules/customers/routes/customer.routes';
import loanRouter from '../../../modules/loans/routes/loans.routes';
import transferRouter from '../../../modules/transfers/routes/transfers.routes';

const routes = Router();

routes.use('/login', sessionsRouter);
routes.use('/account', accountsRouter);
routes.use('/customer', customersRouter);
routes.use('/transfers', transferRouter);
routes.use('/loans', loanRouter);


routes.get('/healthcheck', (request, response) => {
    return response.json({
        message: 'API is running.',
        status_code: 200,
    });
});

export default routes;
