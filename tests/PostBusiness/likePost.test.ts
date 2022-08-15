import { PostBusiness } from "../../src/business/PostBusiness";
import { IDeletePostInputDTO, ILikePostInputDTO } from "../../src/models/Post";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock";
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock";

describe("PostBusiness test", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock(),
    )

    test("succeded likePost", async () => {
        const input: ILikePostInputDTO = {
            token: "token-mock",
            postId: "102"
        }

        const response = await postBusiness.likePost(input);

        expect(response.message).toEqual("Post liked successfully");

    })
})