import type { SuperTest, Test } from 'supertest'
import supertest from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import type { App } from 'h3'
import { createApp, eventHandler, toNodeListener } from 'h3'
import { readBodyWithDefaults } from '../src'

describe('readBodyWithDefaults', () => {
  let app: App
  let request: SuperTest<Test>

  beforeEach(() => {
    app = createApp({ debug: false })
    request = supertest(toNodeListener(app))
  })

  const bodyDefaults = {
    name: 'John',
    foo: 'bar',
  }

  it('body: has one default property', async () => {
    app.use('/defaults', eventHandler(async event => await readBodyWithDefaults(event, bodyDefaults)))

    const { body, status } = await request.post('/defaults').send({ name: 'Christian' })

    expect(status).toEqual(200)
    expect(body).toEqual(
      expect.objectContaining({
        name: 'Christian',
        foo: bodyDefaults.foo,
      }),
    )
  })

  it('body: has both defaults properties', async () => {
    app.use('/defaults', eventHandler(async event => await readBodyWithDefaults(event, bodyDefaults)))

    const res = await request.post('/defaults').send({})

    expect(res.status).toEqual(200)
    expect(res.body).toEqual(
      expect.objectContaining(bodyDefaults),
    )
  })
})
