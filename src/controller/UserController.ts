import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { ILoginInputDTO, ISignupInputDTO } from "../models/User";

export class UserController {
    constructor(
        private userBusiness: UserBusiness = new UserBusiness() 
    ) { }

    public signup = async (req: Request, res: Response) => {
        try {
            const input: ISignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }

            const response = await this.userBusiness.signup(input);

            res.status(200).send(response);            
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const input: ILoginInputDTO = {
                email: req.body.email,
                password: req.body.password,
            }

            const response = await this.userBusiness.login(input);

            res.status(200).send(response);
            
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}