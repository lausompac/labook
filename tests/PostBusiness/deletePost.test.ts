import { PostBusiness } from "../../src/business/PostBusiness";
import { BaseError } from "../../src/errors/BaseError";
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

    test("failed deletePost - invalid token", async () => {
        expect.assertions(2)
        try {
            const input: IDeletePostInputDTO = {
                token: "token-invalid",
                postId: "101"
            }

            await postBusiness.deletePost(input);
        } catch (error) {
            expect(error.message).toEqual("Invalid token");
            expect(error.statusCode).toEqual(400);

        }
    })

    test("failed deletePost - post not found", async () => {
        expect.assertions(2)
        try {
            const input: IDeletePostInputDTO = {
                token: "token-lau",
                postId: "108"
            }

            await postBusiness.deletePost(input);
        } catch (error) {
            expect(error.message).toEqual("Post not found");
            expect(error.statusCode).toEqual(404);

        }
    })

    test("failed deletePost - unauthorized", async () => {
        expect.assertions(2)
        try {
            const input: IDeletePostInputDTO = {
                token: "token-mock",
                postId: "102"
            }

            await postBusiness.deletePost(input);
        } catch (error: unknown) {
            if (error instanceof BaseError) {
            expect(error.message).toEqual("You don't have permission to do this");
            expect(error.statusCode).toEqual(403);
            }
        }
    })
})