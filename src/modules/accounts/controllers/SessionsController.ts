import { Request, Response } from "express";
import CreateSessionService from "../services/CreateSessionService";

export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { account_number, password } = request.body;

        const createSession = new CreateSessionService();

        const account = await createSession.execute({
            account_number,
            password,
        })

        return response.json(account);
    }
}
