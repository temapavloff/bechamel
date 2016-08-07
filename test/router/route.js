import {describe, it} from 'mocha'
import {expect} from 'chai'

import {Route} from '../../src/router/route.js'

describe("Route class", () => {
    let method
    let pattern
    let matches
    let validURL
    let invalidURL

    beforeEach(() => {
        method = 'GET'
        pattern = '/users/{name}/posts/{id}'
        matches = {name: '[a-z]+', id: '[0-9]+'}
        validURL = '/users/john/posts/123'
        invalidURL = '/some/invalid/url'
    })

    it("Shound be possible to create new instance", () => {
        const r = new Route

        expect(r).to.be.instanceOf(Route)
    })

    it("Shound checks if passed string matches route", () => {
        const r = new Route(method, pattern, matches)

        expect(r.match(validURL)).to.be.eq(true)
        expect(r.match(invalidURL)).to.be.eq(false)
    })

    it("Shound extract correct values from given string", () => {
        const r = new Route(method, pattern, matches)
        const result = r.extractValues(validURL)

        expect(result).to.be.an('array')
        expect(result[0]).to.be.eq('john')
        expect(result[1]).to.be.eq('123')
    })

    it("Should create valid url with passed params", () => {
        const r = new Route(method, pattern, matches)
        const result = r.makeUrl({name: 'john', id: '123'})

        expect(result).to.be.eq(validURL)
    })
})