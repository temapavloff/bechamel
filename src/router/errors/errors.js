export class RoutePatternError extends Error {
    constructor(message = 'Invalid route') {
        super(message)
    }
}