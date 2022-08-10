import { userInfo } from "os";
import { IPostDB, Post } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POST = "Labook_Posts";
    public static TABLE_LIKE = "Labook_Likes";

    public createPost = async (post: Post) => {
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
}