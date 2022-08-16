import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { BaseError } from "../errors/BaseError";
import { IDeletePostInputDTO, IGetPostsInputDTO, ILikePostInputDTO, IPostInputDTO } from "../models/Post";

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
        } catch (error: unknown) {
            if (error instanceof BaseError){
                return res.status(error.statusCode).send({ message: error.message });
            }
            res.status(500).send({ message: "Unexpected error occurred while creating post" }); 
        }
    }

    public getAllPosts = async (req: Request, res: Response) => {
        try {
            const input: IGetPostsInputDTO = {
                token: req.headers.authorization,
                search: req.query.search as string,
                order: req.query.order as string,
                sort: req.query.sort as string,
                limit: req.query.limit as string,
                page: req.query.page as string
            }

            const response = await this.postBusiness.getAllPosts(input);

            res.status(200).send(response);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                return res.status(error.statusCode).send({ message: error.message });
            }
            res.status(500).send({ message: "Unexpected error occurred while getting posts" }); 
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {
            const input: IDeletePostInputDTO = {
                token: req.headers.authorization,
                postId: req.params.id
            }

            await this.postBusiness.deletePost(input);

            res.status(200).send({ message: "Post deleted successfully" });
            
        } catch (error: unknown) {
            if (error instanceof BaseError){
                return res.status(error.statusCode).send({ message: error.message });
            }
            res.status(500).send({ message: "Unexpected error occurred while deleting post" }); 
        }
    }

    public likePost = async (req: Request, res: Response) => {
        try {
            const input: ILikePostInputDTO = {
                token: req.headers.authorization,
                postId: req.params.id
            }

            const response = await this.postBusiness.likePost(input);

            res.status(200).send(response);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                return res.status(error.statusCode).send({ message: error.message });
            }
            res.status(500).send({ message: "Unexpected error occurred while liking post" }); 
        }
    }

    public dislikePost = async (req: Request, res: Response) => {
        try {
            const input: ILikePostInputDTO = {
                token: req.headers.authorization,
                postId: req.params.id
            }
            
            const response = await this.postBusiness.dislikePost(input);

            res.status(200).send(response);
        } catch (error: unknown) {
            if (error instanceof BaseError){
                return res.status(error.statusCode).send({ message: error.message });
            }
            res.status(500).send({ message: "Unexpected error occurred while disliking post" }); 
        }
    }
}