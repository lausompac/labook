import { IPostDB } from "../../models/Post";
import { IUserDB, USER_ROLES } from "../../models/User";


export const users: IUserDB[] = [
    {
        id: "bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b",
        name: "Lau",
        email: "lau@gmail.com",
        password: "mb1306182",
        role: USER_ROLES.ADMIN
    },
    {
        id: "f9b7ee8-ae4b-4bd1-9bd6-e7e21594399b",
        name: "Thali",
        email: "thali@gmail.com",
        password: "blabla123",
        role: USER_ROLES.NORMAL
    }

]

export const posts: IPostDB[] = [
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
    }
]