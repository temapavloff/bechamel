export class LoadingModuleError {
    constructor(moduleName) {
        Error.captureStackTrace(this, this.constructor)
        this.message = `Cannot load module ${moduleName}` 
    }

    toJSON() {
        return {
            message: this.message,
            errorCode: this.constructor.name
        }
    }
}