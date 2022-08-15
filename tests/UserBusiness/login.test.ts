import { UserBusiness } from "../../src/business/UserBusiness";
import { ILoginInputDTO } from "../../src/models/User";
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock";
import { HashManagerMock } from "../mocks/services/HashManagerMock";
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock";
import { UserDatabaseMock } from "../mocks/UserdatabaseMock";

describe("UserBusiness test", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    );

    test("succeded login", async () => {
        const input: ILoginInputDTO = {
            email: "lau@gmail.com",
            password: "selfmade"
        }

        const response = await userBusiness.login(input);

        expect(response.message).toEqual("User logged in successfully");
        expect(response.token).toEqual("token-lau");
    })
})