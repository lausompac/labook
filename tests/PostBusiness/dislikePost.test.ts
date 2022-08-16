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

    test("failed dislikePost - haven't liked this post", async () => {
        expect.assertions(2)
        try {
            const input: ILikePostInputDTO = {
                token: "token-mock",
                postId: "101"
            }

            await postBusiness.dislikePost(input);
        } catch (error) {
            expect(error.message).toEqual("You haven't liked this post");
            expect(error.statusCode).toEqual(409);

        }
    })
})