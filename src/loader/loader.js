import {LoadingModuleError} from './errors/errors.js'

export class Loader {
    static Controllers = '/controllers'

    constructor(applicationPath) {
        this.applicationPath = applicationPath
    }

    import(namespacePath, modulePath) {
        const fullPath = `${this.applicationPath}${namespacePath}/${modulePath}`

        try {
            return require(fullPath).default
        } catch (e) {
            throw new LoadingModuleError(fullPath)
        }
    }

    importController(name) {
        return this.import(Loader.Controllers, name)
    }
}