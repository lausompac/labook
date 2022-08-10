import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { IPostInputDTO } from "../models/Post";

export class PostController {
    constructor(
        private postBusiness: PostBusiness = new PostBusiness()
    ) { }

    public createPost = async (req: Request, res: Response) => {
        try {
            const input: IPostInputDTO = {
                token: req.headers.authorization,
                text: req.body.text
            }

            const response = await this.postBusiness.createPost(input);

            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}