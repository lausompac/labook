import { PostDatabase } from "../database/PostDatabase";
import { IPostInputDTO, Post } from "../models/Post";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase = new PostDatabase(),
        private idGenerator: IdGenerator = new IdGenerator(),
        private authenticator: Authenticator = new Authenticator()
    ) { }

    public createPost = async (input: IPostInputDTO) => {
        const token = input.token;
        const text = input.text;

        if (!token) {
            throw new Error("Missing Token");
        }

        if (!text) {
            throw new Error("Missing text");
        }

        if (typeof text !== "string" || text.length < 1) {
            throw new Error("Invalid text");
        }

        const payload = this.authenticator.getTokenPayload(token);

        if (!payload) {
            throw new Error("Invalid Token");
        }

        const userId = payload.id;
        const postId = this.idGenerator.generate();
        const post = new Post(
            postId,
            text,
            userId,
            0
        );
        
        await this.postDatabase.createPost(post);

        const response = {
            message: "Post created successfully",
            post
        }

        return response;
    }
}