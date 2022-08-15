import { UserBusiness } from "../../src/business/UserBusiness";
import { ISignupInputDTO } from "../../src/models/User";
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock";
import { UserDatabaseMock } from "../mocks/UserdatabaseMock";

describe("UserBusiness test", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    );

    test("succeded signup", async () => {
        const input: ISignupInputDTO = {
            name: "Thalita",
            email: "thali@gmail.com",
            password: "thali1234"
        }

        const response = await userBusiness.signup(input);

        expect(response.message).toEqual("User created successfully");
        expect(response.token).toEqual("token-mock");
    })
})