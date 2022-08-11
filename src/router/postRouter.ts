import { Router } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostController } from "../controller/PostController";
import { PostDatabase } from "../database/PostDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export const postRouter = Router();

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
    )
);

postRouter.post("/", postController.createPost);
postRouter.get("/", postController.getAllPosts);
postRouter.delete("/:id", postController.deletePost);
postRouter.post("/:id", postController.likePost);
