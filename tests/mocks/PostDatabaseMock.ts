import { BaseDatabase } from "../../src/database/BaseDatabase";
import { IGetPostsDBDTO, ILikePostDBDTO, IPostDB, Post } from "../../src/models/Post";


export class PostDatabaseMock extends BaseDatabase {
    public static TABLE_POST = "Labook_Posts";
    public static TABLE_LIKE = "Labook_Likes";

    findPostById = async (postId: string) => {
        switch (postId) {
            case "101":

                return {
                    id: "101",
                    text: "tô sentindo que essa aplicação vai render",
                    creator_id: "bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b",
                    likes: 0
                } as IPostDB

            case "102":
                return {
                    id: "102",
                    text: "Hello World",
                    creator_id: "bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b",
                    likes: 1
                }

            case "103":
                return {
                    id: "103",
                    text: "dá um like aqui",
                    creator_id: "bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b",
                    likes: 1
                }

            default:
                return undefined;
        }
    }

    findLikeById = async (post_id: string, user_id: string) => {
        switch (post_id) {

            case "103": 
                return {    
                    post_id: "103",
                    user_id: "id-mock",
                } as ILikePostDBDTO

            default:
                return undefined;
        }
    }

    createPost = async (post: Post) => {}

    getAllPosts = async (input: IGetPostsDBDTO) => {
        const posts: IPostDB[] = [
            {
                id: "101",
                text: "tô sentindo que essa aplicação vai render",
                creator_id: "bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b",
                likes: 0
            },
            {
                id: "102",
                text: "Hello World",
                creator_id: "bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b",
                likes: 0
            },
            {
                id: "103",
                text: "dá um like aqui",
                creator_id: "id-mock",
                likes: 0
            }

        ]

        return posts;

    }

    deletePost = async (postId: string) => {}

    likePost = async (like: ILikePostDBDTO) => {}

    dislikePost = async (dislike: ILikePostDBDTO) => {}

}