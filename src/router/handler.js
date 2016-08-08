import {InvalidRouteHanderError} from './errors/errors.js'

const HADLER_FUNCTION = Symbol('HADLER_FUNCTION')

export class Handler {
    constructor(loader, handler) {
        this.loader = loader
        
        if (typeof handler === 'function') {
            this[HADLER_FUNCTION] = handler
        } else if (typeof handler === 'string') {
            this.makeHandlerFromString(handler)
        } else {
            throw new InvalidRouteHanderError('Handler definition must be function or string constroler@method')
        }
    }

    async run(...params) {
        return await this[HADLER_FUNCTION](...params)
    }

    makeHandlerFromString(handlerPattern) {
        if (handlerPattern.indexOf('@') < 1) {
            throw new InvalidRouteHanderError('Hanlder patter must be controller@method')
        }
        
        const [ctrlPath, methodName] = handlerPattern.split('@')
        const controllerClass = this.loader.importController(ctrlPath)

        this[HADLER_FUNCTION] = async function (...params) {
            return await (new controllerClass)[methodName](...params)
        }
    }
}