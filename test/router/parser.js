import {describe, it} from 'mocha'
import {expect} from 'chai'

import {extractParams, replaceParams, makeRegexp} from '../../src/router/parser.js'
import {RoutePatternError} from '../../src/router/errors/errors.js'

describe('Route parser basic test', () => {
    let pattern 
    let replacements
    let matchers

    beforeEach(() => {
        pattern = '/users/{name}/posts/{id}'
        replacements = {name: 'john', id: 123}
        matchers = {name: '[a-z]+', id: '[0-9]+'}
    })

    it("Should extract params from route string", () => {
        const result = extractParams(pattern)

        expect(result).to.be.an('array')
        expect(result[0]).to.be.eq('name')
        expect(result[1]).to.be.eq('id')
    })

    it("Should return enpty array if no matches found", () => {
        const result = extractParams('/')

        expect(result).to.be.an('array')
        expect(result.length).to.be.eq(0)
    })

    it("Should replace params with it's actual values", () => {
        const result = replaceParams(pattern, replacements)

        expect(result).to.be.eq('/users/john/posts/123')
    })

    it("Should create valid regex", () => {
        const params = extractParams(pattern)
        const result = makeRegexp(pattern, params, matchers)

        expect(result).to.be.a('regexp')
    })

    it("Should match correct string", () => {
        const params = extractParams(pattern)
        const regexp = makeRegexp(pattern, params, matchers)
        const URL = '/users/john/posts/123'

        expect(regexp.test(URL)).to.be.eq(true)
    })

    it("Should not match incorrect string", () => {
        const params = extractParams(pattern)
        const regexp = makeRegexp(pattern, params, matchers)
        const URL = '/some/invalid/path'

        expect(regexp.test(URL)).to.be.eq(false)
    })

    it("Should also match correct string with trailing slash", () => {
        const params = extractParams(pattern)
        const regexp = makeRegexp(pattern, params, matchers)
        const URL = '/users/john/posts/123/'

        expect(regexp.test(URL)).to.be.eq(true)
    })

    it("Should extract matches from given string", () => {
        const params = extractParams(pattern)
        const regexp = makeRegexp(pattern, params, matchers)
        const URL = '/users/john/posts/123'
        const arr = URL.match(regexp)

        expect(arr).to.be.an('array')
        expect(arr[0]).to.be.eq(URL)
        expect(arr[1]).to.be.eq('john')
        expect(arr[2]).to.be.eq('123')
    })

    it("Should throw RoutePatternError tring to parse invalid pattern", () => {
        const brokenPattern = '}/users/{name}/posts/{id}'
        const params = extractParams(pattern)

        try {
            const regexp = makeRegexp(pattern, params, matchers)
        } catch (e) {
            expect(true).to.be.eq(true)
            expect(e).to.be.instanceOf(RoutePatternError)
        }
    })
})