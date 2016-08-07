import {extractParams, replaceParams, makeRegexp} from '../../src/router/parser.js'

export class Route {
    constructor(method = 'GET', pattern = '/', matches = {}) {
        const params = extractParams(pattern)

        this.method = method
        this.pattern = pattern
        this.regexp = makeRegexp(pattern, params, matches)
    }

    match(url = '') {
        return this.regexp.test(url)
    }

    extractValues(url = '') {
        const [, ...rest] = url.match(this.regexp)
        
        if (rest === null) {
            return []
        }

        return rest
    }

    makeUrl(params) {
        return replaceParams(this.pattern, params)
    }
}