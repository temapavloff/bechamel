import {Route} from './route.js'
import {NotFoundError} from '../http/errors/errors.js'

const ALLOWED_METHOD = ['GET', 'POST', 'PUT', 'DELETE']
let METHODS_STORE = {}

export class Router {
    static cleanRoutes() {
        METHODS_STORE = {}
    }

    static getMethodStore(method) {
        if (typeof method !== 'string' || method.length === 0) {
            throw new TypeError('Method name must be string')
        }

        if (METHODS_STORE[method] === undefined) {
            METHODS_STORE[method] = new Map
        }

        return METHODS_STORE[method]
    }

    static addRoute(method, pattern, options) {
        method = method.toUpperCase()
        let handler
        let matches = {}

        // TODO ligic for setting up handler must be in other place
        if (typeof options === 'function') {
            handler = options
        } else if (options.handler !== undefined) {
            handler = options.handler
            delete options.handler
            matches = Object.assign({}, options)
        } else {
            throw new Error("Route handler is not defined")
        }

        const route = new Route(method, pattern, matches)
        Router.getMethodStore(method).set(route, handler)
        return route
    }

    static getMatchingRoute(method, url) {
        const store = Router.getMethodStore(method.toUpperCase())

        for (const [route, handler] of store.entries()) {
            if (route.match(url)) {
                return route
            }
        }

        throw new NotFoundError
    }

    static getHandler(route) {
        const store = Router.getMethodStore(route.method)
        return store.get(route)
    }
}

for (const method of ALLOWED_METHOD) {
    Router[method.toLowerCase()] = (...args) => {
        Router.addRoute(method, ...args)
    }
}