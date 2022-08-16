import { BaseError } from "./BaseError";

export class ConflictError extends BaseError {
    constructor(
        message: string = "Conflict error",
    ) {
        super(409, message)
    }
}