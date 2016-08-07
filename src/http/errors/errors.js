import {STATUS_CODES} from 'http'

export class HttpError {
    constructor(message, httpCode = 0, errorCode) {
        Error.captureStackTrace(this, this.constructor)
        this.message = message
        this.httpCode = httpCode
        this.errorCode = errorCode
    }

    toJSON() {
        return {
            statusCode: this.httpCode,
            errorCode: this.errorCode
        }
    }
}

export class BadRequestError extends HttpError {
    constructor(message = "Bad Request") {
        super(message, 400, STATUS_CODES[400])
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message = "Unauthorized") {
        super(message, 401, STATUS_CODES[401])
    }
}

export class PaymentRequiredError extends HttpError {
    constructor(message = "Payment Required") {
        super(message, 402, STATUS_CODES[402])
    }
}

export class ForbiddenError extends HttpError {
    constructor(message = "Forbidden") {
        super(message, 403, STATUS_CODES[403])
    }
}

export class NotFoundError extends HttpError {
    constructor(message = "Not Found") {
        super(message, 404, STATUS_CODES[404])
    }
}

export class MethodNotAllowedError extends HttpError {
    constructor(message = "Method Not Allowed") {
        super(message, 405, STATUS_CODES[405])
    }
}

// TODO implement all other client errors

export class InternalServerError extends HttpError {
    constructor(message = "Internal Server Error") {
        super(message, 500, STATUS_CODES[500])
    }
}

// TODO implement all other server errors