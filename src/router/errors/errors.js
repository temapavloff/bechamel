export class RouterError {
    constructor(message) {
        Error.captureStackTrace(this, this.constructor)
        this.message = message
    }

    toJSON() {
        return {
            message: this.message,
            errorCode: this.constructor.name
        }
    }
}

export class RoutePatternError extends RouterError {
    constructor(message = 'Invalid route') {
        super(message)
    }
}

export class InvalidRouteHanderError extends RouterError {
    constructor(message = 'Invalid route hanlder') {
        super(message)
    }
}