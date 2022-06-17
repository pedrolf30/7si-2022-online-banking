import { Request, Response } from "express";
import CreateTransferService from "../services/CreateTransferService";
import ListTransfersService from "../services/ListTransfersService";
import ShowTransferService from "../services/ShowTransferService";
import { classToClass } from 'class-transformer';

export default class TransfersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { account_number } = request.account;
        const listTransfer = new ListTransfersService();

        const transfer = await listTransfer.execute({account_number});

        return response.json(classToClass(transfer));
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { transfer_reference } = request.params;
        const showTransfer = new ShowTransferService();

        const transfer = await showTransfer.execute({ transfer_reference });

        return response.json(classToClass(transfer));
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { amount, receiver } = request.body;
        const { account_number } = request.account;
        const createTransfer = new CreateTransferService();

        const transfer = await createTransfer.execute({
            amount,
            sender: account_number,
            receiver,
        })

        return response.json(classToClass(transfer));
    }
}
