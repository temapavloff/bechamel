import {describe, it} from 'mocha'
import {expect} from 'chai'

import {Router} from '../../src/router/router.js'
import {Route} from '../../src/router/route.js'

describe("Router class", () => {
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
        Router.cleanRoutes()
    })

    it("Should return Map instance", () => {
        const store = Router.getMethodStore(method)

        expect(store).to.be.instanceOf(Map)
    })

    it("Should have following methods: get, post, put, delete", () => {
        for (const method of ['get', 'post', 'put', 'delete']) {
            expect(Router[method]).to.be.a('function')
        }
    })

    it("Should return instance of route", () => {
        const handler = () => true
        const route = Router.addRoute(method, pattern, handler)

        expect(route).to.be.instanceOf(Route)
    })

    it("Should be possible to add new route", () => {
        const handler = () => true
        const route = Router.addRoute(method, pattern, handler)
        const hasRoute = Router.getMethodStore(method).has(route)

        expect(hasRoute).to.be.eq(true)
    })

    it("Should return matching route", () => {
        const handler = () => true
        const route = Router.addRoute(method, pattern, handler)
        const matchingRoute = Router.getMatchingRoute(method, validURL)

        expect(route).to.be.eq(matchingRoute)
    })
})