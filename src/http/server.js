import {createServer} from 'http'
import {HttpError} from './errors/errors.js'
import {Router} from '../router/router.js'

let serverInstance = null

export class Server {
    constructor(port) {
        this.port = port
        serverInstance = createServer((req, res) => {this.handleRequest(req, res)})
    }

    run() {
        serverInstance.listen(this.port)
    }

    async handleRequest(req, res) {
        const method = req.method
        const url = req.url

        try {
            const route = Router.getMatchingRoute(method, url)
            const params = route.extractValues(url)
            const handler = Router.getHandler(route)
            const responseBody = await handler.run(...params)
            
            res.end(responseBody)
        } catch (e) {
            if (e instanceof HttpError) {
                res.statusCode = e.httpCode
                res.end(e.message)
            } else {
                res.statusCode = 500
                res.end(e.message)
            }   
        }
    }
}