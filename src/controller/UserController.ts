import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../errors/BaseError";
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
        } catch (error: unknown) {
            if (error instanceof BaseError){
                return res.status(error.statusCode).send({ message: error.message });
            }
            res.status(500).send({ message: "Unexpected error occurred while signing up" }); 
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
            
        } catch (error: unknown) {
            if (error instanceof BaseError){
                return res.status(error.statusCode).send({ message: error.message });
            }
            res.status(500).send({ message: "Unexpected error occurred while logging in" }); 
        }
    }
}