import { MsgRes } from "../controllers/BaseController";

export class ApiError extends Error {
    status: number;
    body: MsgRes;
    constructor(status: number, message: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.body = { message };
    }
}

export class InternalServerError extends ApiError {
    constructor(message: string) {
        super(500, message);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string) {
        super(401, message);
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(400, message);
    }
}

export class AlreadyExistError extends ApiError {
    constructor(resource: string) {
        super(400, `${resource} already exists.`);
    }
}

export class NotFoundError extends ApiError {
    constructor(resource: string, id?: number | string) {
        let message = `${resource} not found.`;
        if (id) message = `${resource} with ID ${id} not found.`
        super(404, message);
    }
}
