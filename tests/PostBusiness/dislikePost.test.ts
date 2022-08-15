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

    test("succeded dislikePost", async () => {
        const input: ILikePostInputDTO = {
            token: "token-mock",
            postId: "103"
        }

        const response = await postBusiness.dislikePost(input);

        expect(response.message).toEqual("Post disliked successfully");

    })
})