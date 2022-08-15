import { PostBusiness } from "../../src/business/PostBusiness";
import { IDeletePostInputDTO } from "../../src/models/Post";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock";
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock";

describe("PostBusiness test", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock(),
    )

    test("succeded deletePost", async () => {
        const input: IDeletePostInputDTO = {
            token: "token-lau",
            postId: "101"
        }

        const response = await postBusiness.deletePost(input);

        expect(response.message).toEqual("Post deleted successfully");

    })
})