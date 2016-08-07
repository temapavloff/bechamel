import {RoutePatternError} from './errors/errors.js'

/**
 * Extract params from route pattern
 * @param {String} pattern - route pattern in form like '/users/{name}/posts/{id}'
 * @returns {Array} - array of found params
 */
export function extractParams(pattern) {
    const matches = pattern.match(/{([a-zA-Z]+)}/g)

    if (matches === null) {
        return []
    }
    return matches.map(param => param.substr(1, param.length - 2))
}

/**
 * Replaces params in pattern with values
 * @param {String} pattern - route pattern in form like '/users/{name}/posts/{id}'
 * @param {Object} replacements - Object which keys is patters's params and values is replacements
 */
export function replaceParams(pattern, replacements = {}) {
    for (const [param, value] of Object.entries(replacements)) {
        pattern = pattern.replace(`{${param}}`, value)
    }

    return pattern
}

/**
 * Makes regular expression from given pattern, params and matchers
 * @param {String} pattern - route pattern in form like '/users/{name}/posts/{id}'
 * @param {String[]} params - array of parameners to match
 * @param {Object} [matches] - optional object describes allowed symbols set for every param
 * @throws {RoutePatternError}
 * @returns {RegExp}
 */
export function makeRegexp(pattern, params, matches = {}) {
    const defaultMatch = '.*'
    const replacements = {}

    for (const param of params) {
        replacements[param] = '(' + (matches[param] || defaultMatch) + ')'
    }

    const re = '^' + replaceParams(pattern, replacements).replace(/\//g, '\\/') + '\/?$'

    try {
        return new RegExp(re)    
    } catch (e) {
        throw new RoutePatternError(`Cannot parse pattern ${pattern}`)
    }
}