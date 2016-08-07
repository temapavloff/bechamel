import {createServer} from 'http'
import {HttpError} from './errors/errors.js'
import {Router} from '../router/router.js'

Router.get('/', async () => 'It is index!')
Router.get('/name/{name}', {
    name: '[a-z]+',
    handler: async (name) => `It is ${name}!`
})

let serverInstance = null

class Server {
    constructor(port) {
        serverInstance = createServer((req, res) => {this.handleRequest(req, res)})
        this.port = port
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
            const responseBody = await handler(...params)
            
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

(new Server(8000)).run()