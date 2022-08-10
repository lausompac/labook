import { UserDatabase } from "../database/UserDatabase";
import { ILoginInputDTO, ISignupInputDTO, User, USER_ROLES } from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase = new UserDatabase(),
        private idGenerator: IdGenerator = new IdGenerator(),
        private hashManager: HashManager = new HashManager(),
        private authenticator: Authenticator = new Authenticator()
    ) { }

    public signup = async(input: ISignupInputDTO) => {
        const name = input.name;
        const email = input.email;
        const password = input.password;

        if (!name || !email || !password) {
            throw new Error("Missing input");
        }

        if (typeof name !== "string" || name.length < 3) {
            throw new Error("Invalid name");
        }

        if (typeof email !== "string" || email.length < 3) {
            throw new Error("Invalid email");
        }

        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            throw new Error("Invalid email");
        }

        if (typeof password !== "string" || password.length < 6) {
            throw new Error("Invalid password");
        }

        const userDB = await this.userDatabase.findByEmail(email);

        if (userDB) {
            throw new Error("User already exists");
        }

        const id = this.idGenerator.generate();
        const hashPassword = await this.hashManager.hash(password);

        const user = new User(
            id,
            name,
            email,
            hashPassword,
            USER_ROLES.NORMAL
        )

        await this.userDatabase.createUser(user);

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const token = this.authenticator.generateToken(payload);

        const response = {
            message: "User created successfully",
            token
        }

        return response;
    }

    public login = async(input: ILoginInputDTO) => {
        const email = input.email
        const password = input.password

        if (!email || !password) {
            throw new Error("Missing input");
        }

        if (typeof email !== "string" || email.length < 3) {
            throw new Error("Invalid email");
        }

        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            throw new Error("Invalid email");
        }

        if (typeof password !== "string" || password.length < 6) {
            throw new Error("Invalid password");
        }

        const userDB = await this.userDatabase.findByEmail(email);

        if (!userDB) {
            throw new Error("User not found");
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role
        )

        const isPasswordCorrect = await this.hashManager.compare(password, user.getPassword());

        if (!isPasswordCorrect) {
            throw new Error("Invalid password");
        }

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const token = this.authenticator.generateToken(payload);

        const response = {
            message: "User logged in successfully",
            token
        }

        return response;
    }


}