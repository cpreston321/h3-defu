import type { SuperTest, Test } from 'supertest'
import supertest from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import type { App } from 'h3'
import { createApp, eventHandler, toNodeListener } from 'h3'
import { getQueryWithDefaults } from '../src'

describe('getQueryWithDefaults', () => {
  let app: App
  let request: SuperTest<Test>

  beforeEach(() => {
    app = createApp({ debug: false })
    request = supertest(toNodeListener(app))
  })

  const queryDefaults = {
    name: 'John',
    foo: 'bar',
  }

  it('query: has one default "fo" property', async () => {
    app.use('/defaults', eventHandler(event => getQueryWithDefaults(event, queryDefaults)))

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
    app.use('/defaults', eventHandler(event => getQueryWithDefaults(event, queryDefaults)))

    const res = await request.get('/defaults')

    expect(res.status).toEqual(200)
    expect(res.body).toEqual(
      expect.objectContaining(queryDefaults),
    )
  })
})
