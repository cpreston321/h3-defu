import supertest, { type SuperTest, type Test } from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import type { App } from 'h3'
import { createApp, eventHandler, toNodeListener } from 'h3'
import { getQueryWithDefaults } from '../src'

describe('getQueryWithDefaults', () => {
  let app: App
  let request: SuperTest<Test>
  const queryDefaults = {
    name: 'John',
    foo: 'bar',
  }

  beforeEach(() => {
    // Create app
    app = createApp({ debug: false })
    app.use('/defaults', eventHandler(event => getQueryWithDefaults(event, queryDefaults)))

    request = supertest(toNodeListener(app))
  })

  it('query: has one default "fo" property', async () => {
    const res = await request.get('/defaults?name=Christian')

    expect(res.status).toEqual(200)
    expect(res.body).toEqual(
      expect.objectContaining({
        name: 'Christian',
        foo: queryDefaults.foo,
      }),
    )
  })

  it('query: has both default properties', async () => {
    const res = await request.get('/defaults')

    expect(res.status).toEqual(200)
    expect(res.body).toEqual(
      expect.objectContaining(queryDefaults),
    )
  })
})
