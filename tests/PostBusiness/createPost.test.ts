import { PostBusiness } from "../../src/business/PostBusiness";
import { BaseError } from "../../src/errors/BaseError";
import { IPostInputDTO } from "../../src/models/Post";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock";
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock";

describe("PostBusiness test", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock(),
    )

    test("succeded create post", async () => {
        const input: IPostInputDTO = {
            token: "token-lau",
            text: "e ae galera"
        }

        const response = await postBusiness.createPost(input);

        expect(response.message).toEqual("Post created successfully");
        expect(response.post.getId()).toEqual("id-mock");
        expect(response.post.getText()).toEqual("e ae galera");
        expect(response.post.getCreatorId()).toEqual("bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b");
    })

    test("failed create post - invalid text", async () => {
        expect.assertions(2)
        try {
            const input: IPostInputDTO = {
                token: "token-lau",
                text: ""
            }

            await postBusiness.createPost(input);
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Missing text");
                expect(error.statusCode).toEqual(400);
            }
        }
    })

    test("failed create post - invalid token", async () => {
        expect.assertions(2)
        try {
            const input: IPostInputDTO = {
                token: "token-invalid",
                text: "e ae galera"
            }

            await postBusiness.createPost(input);
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Invalid token");
                expect(error.statusCode).toEqual(400);
            }
        }
    })

})