import { BaseError } from "./BaseError";

export class RequestError extends BaseError {
    constructor(
        message: string = "Request error",
    ) {
        super(400, message)
    }
}