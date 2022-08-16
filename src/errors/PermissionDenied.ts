import { BaseError } from "./BaseError";

export class PermissionDeniedError extends BaseError {
    constructor(
        message: string = "Unauthorized",
    ) {
        super(403, message)
    }
}