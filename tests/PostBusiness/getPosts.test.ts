import { PostBusiness } from "../../src/business/PostBusiness";
import { IGetPostsInputDTO, IPostInputDTO } from "../../src/models/Post";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock";
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock";

describe("PostBusiness test", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock(),
    )

    test("succeded getAllPosts", async () => {
        const input: IGetPostsInputDTO = {
            token: "token-lau",
            search: "",
            order: "ASC",
            sort: "likes",
            limit: "10",
            page: "1"
        }

        const response = await postBusiness.getAllPosts(input);

        expect(response.posts.length).toEqual(2);
       
    })
})