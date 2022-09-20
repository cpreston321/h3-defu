import supertest, { SuperTest, Test } from 'supertest'
import { describe, beforeEach, it, expect } from 'vitest'
import { createApp, App } from 'h3'
import { getQueryWithDefaults } from '../src'

describe('getQueryWithDefaults', () => {
  let app: App
  let request: SuperTest<Test>

  beforeEach(() => {
    app = createApp({ debug: false })
    request = supertest(app)
  })

  const queryDefaults = {
    name: 'John',
    foo: 'bar'
  }

  it('query: has one default "fo" property', async () => {
    app.use('/defaults', event => getQueryWithDefaults(event, queryDefaults))

    const res = await request.get('/defaults?name=Christian')

    expect(res.status).toEqual(200)
    expect(res.body).toEqual(
      expect.objectContaining({
        name: 'Christian',
        foo: queryDefaults.foo
      })
    )
  })

  it('query: has both default properties', async () => {
    app.use('/defaults', req => getQueryWithDefaults(req, queryDefaults))

    const res = await request.get('/defaults')

    expect(res.status).toEqual(200)
    expect(res.body).toEqual(
      expect.objectContaining(queryDefaults)
    )
  })
})
