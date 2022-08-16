import { BaseError } from "./BaseError";

export class PermissionDeniedError extends BaseError {
    constructor(
        message: string = "Permission denied",
    ) {
        super(403, message)
    }
}