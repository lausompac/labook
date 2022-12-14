import { PostDatabase } from "../database/PostDatabase";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { PermissionDeniedError } from "../errors/PermissionDenied";
import { RequestError } from "../errors/RequestError";
import { IDeletePostInputDTO, IGetPostsDBDTO, IGetPostsInputDTO, ILikePostDBDTO, ILikePostInputDTO, IPostInputDTO, Post } from "../models/Post";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase = new PostDatabase(),
        private idGenerator: IdGenerator = new IdGenerator(),
        private authenticator: Authenticator = new Authenticator()
    ) { }

    public createPost = async (input: IPostInputDTO) => {
        const { token, text } = input;

        if (!token) {
            throw new RequestError("Missing Token");
        }

        if (!text) {
            throw new RequestError("Missing text");
        }

        if (typeof text !== "string" || text.length < 1) {
            throw new RequestError("Invalid text");
        }

        const payload = this.authenticator.getTokenPayload(token);

        if (!payload) {
            throw new RequestError("Invalid token");
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

    public getAllPosts = async (input: IGetPostsInputDTO) => {
        const token = input.token;
        const search = input.search || "";
        const order = input.order || "ASC";
        const sort = input.sort || "likes";
        const limit = Number(input.limit) || 10;
        const page = Number(input.page) || 1;
        const offset = limit * (page - 1);


        if (!token) {
            throw new RequestError("Missing token");
        }

        const payload = this.authenticator.getTokenPayload(token);

        if (!payload) {
            throw new RequestError("Invalid token");
        }

        const getpostsInputDB: IGetPostsDBDTO = {
            search,
            order,
            sort,
            limit,
            offset
        }

        const postsDB = await this.postDatabase.getAllPosts(getpostsInputDB);
        const posts = postsDB.map(post => {
            return {
                id: post.id,
                text: post.text,
                creator_id: post.creator_id,
                likes: post.likes
            }
        });

        const response = {
            posts
        }

        return response;

    }

    public deletePost = async (input: IDeletePostInputDTO) => {
        const { token, postId } = input;

        if (!token) {
            throw new RequestError("Missing token");
        }

        if (!postId) {
            throw new RequestError("Missing postId");
        }

        const payload = this.authenticator.getTokenPayload(token);

        if (!payload) {
            throw new RequestError("Invalid token");
        }

        const postDB = await this.postDatabase.findPostById(postId);

        if (!postDB) {
            throw new NotFoundError("Post not found");
        }

        const isUserCreator = postDB.creator_id === payload.id;
        const isUserAdmin = payload.role === "ADMIN";

        if (!isUserCreator && !isUserAdmin) {
            throw new PermissionDeniedError("You don't have permission to do this");
        }

        await this.postDatabase.deletePost(postId);

        const response = {
            message: "Post deleted successfully"
        }

        return response;

    }

    public likePost = async (input: ILikePostInputDTO) => {
        const { token, postId } = input;

        if (!token) {
            throw new RequestError("Missing token");
        }

        if (!postId) {
            throw new RequestError("Missing postId");
        }

        const payload = this.authenticator.getTokenPayload(token);

        if (!payload) {
            throw new RequestError("Invalid token");
        }

        const postDB = await this.postDatabase.findPostById(postId);

        if (!postDB) {
            throw new NotFoundError("Post not found");
        }

        const userId = payload.id;
        const likeDB = await this.postDatabase.findLikeById(postId, userId);

        if (likeDB) {
            throw new ConflictError("You already liked this post");
        }

        const like: ILikePostDBDTO = {
            post_id: postId,
            user_id: userId
        }

        await this.postDatabase.likePost(like);

        const response = {
            message: "Post liked successfully"
        }

        return response;
    }

    public dislikePost = async (input: ILikePostInputDTO) => {
        const {token, postId} = input;

        if (!token) {
            throw new RequestError("Missing token");
        }

        if (!postId) {
            throw new RequestError("Missing postId");
        }

        const payload = this.authenticator.getTokenPayload(token);

        if (!payload) {
            throw new RequestError("Invalid token");
        }

        const postDB = await this.postDatabase.findPostById(postId);

        if (!postDB) {
            throw new NotFoundError("Post not found");
        }

        const userId = payload.id;
        const likeDB = await this.postDatabase.findLikeById(postId, userId);

        if (!likeDB) {
            throw new ConflictError("You haven't liked this post");
        }

        const dislike: ILikePostDBDTO = {
            post_id: postId,
            user_id: userId
        }

        await this.postDatabase.dislikePost(dislike);

        const response = {
            message: "Post disliked successfully"
        }

        return response;
    }
}