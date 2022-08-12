import { userInfo } from "os";
import { IGetPostsDBDTO, ILikePostDBDTO, IPostDB, Post } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POST = "Labook_Posts";
    public static TABLE_LIKE = "Labook_Likes";

    findPostById = async (postId: string) => {
        const result = await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .select("*")
            .where({ id: postId });

        return result[0];
    }

    findLikeById = async (post_id: string, user_id: string) => {
        const result = await BaseDatabase
            .connection(PostDatabase.TABLE_LIKE)
            .select("*")
            .where({ post_id, user_id });

        return result[0];
    }

    createPost = async (post: Post) => {
        const postDB: IPostDB = {
            id: post.getId(),
            text: post.getText(),
            creator_id: post.getCreatorId(),
            likes: post.getLikes()
        }

        await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .insert(postDB);
    }

    getAllPosts = async (input: IGetPostsDBDTO) => {
        const { search, order, sort, limit, offset } = input;

        if (search) {
            const searchPattern = `%${search}%`;
            const postsDB = await BaseDatabase
                .connection(PostDatabase.TABLE_POST)
                .select("*")
                .where(`text`, "like", searchPattern)
                .orderBy(sort, order)
                .limit(limit)
                .offset(offset);

            return postsDB

        } else {

            const postsDB: IPostDB[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POST)
                .select("*")
                .orderBy(sort, order)
                .limit(limit)
                .offset(offset);

            return postsDB;
        }
    }

    deletePost = async (postId: string) => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .where("id", "=", `${postId}`)
            .delete();
    }

    likePost = async (like: ILikePostDBDTO) => {
        const likeDB: ILikePostDBDTO = {
            post_id: like.post_id,
            user_id: like.user_id
        }

        await BaseDatabase
            .connection(PostDatabase.TABLE_LIKE)
            .insert(likeDB);

        await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .where("id", "=", `${like.post_id}`)
            .increment("likes", 1);

    }

    dislikePost = async (dislike: ILikePostDBDTO) => {
        const dislikeDB: ILikePostDBDTO = {
            post_id: dislike.post_id,
            user_id: dislike.user_id
        }

        await BaseDatabase
            .connection(PostDatabase.TABLE_LIKE)
            .where({ post_id: dislike.post_id, user_id: dislike.user_id })
            .delete();

        await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .where("id", "=", `${dislike.post_id}`)
            .decrement("likes", 1);
    }

    }