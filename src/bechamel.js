import {readdir} from 'fs'
import {Server} from './http/server.js'

const CONTROLLER_REGISTRY = new Map

export class Bechamel {
    constructor(applicationPath) {
        this.applicationPath = applicationPath
        require(this.applicationPath + '/router.js')
    }

    async run() {
        (new Server(8000)).run()
    }
}