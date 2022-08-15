import { BaseDatabase } from "../../src/database/BaseDatabase";
import { IUserDB, User, USER_ROLES } from "../../src/models/User"

export class UserDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "Labook_Users";

    findByEmail = async (email: string) => {
        switch (email) {
            case "lau@gmail.com":

                return {
                    id: "bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b",
                    name: "Lau",
                    email: "lau@gmail.com",
                    password: "$2a$12$sXDASTjOnod8rIa5iP1ld.Q8s9ZXR8oDAvlmZr.i7Dz7thWGRRfqy",
                    role: USER_ROLES.ADMIN

                } as IUserDB

            default:
                return undefined;
        }

    }

    createUser = async (user: User) => {

    }
}