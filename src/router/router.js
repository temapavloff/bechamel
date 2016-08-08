import {Route} from './route.js'
import {Handler} from './handler.js'
import {NotFoundError} from '../http/errors/errors.js'
import {Loader} from '../loader/loader.js'

const loader = new Loader(process.cwd())


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

        if (ALLOWED_METHOD.indexOf(method) === -1) {
            throw new Error(`Method ${method} is not supported`)
        }

        if (METHODS_STORE[method] === undefined) {
            METHODS_STORE[method] = new Map
        }

        return METHODS_STORE[method]
    }

    static addRoute(method, pattern, handler, matches = {}) {
        method = method.toUpperCase()

        const route = new Route(method, pattern, matches)
        const handlerFunction = new Handler(loader, handler)
        
        Router.getMethodStore(method).set(route, handlerFunction)
        
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