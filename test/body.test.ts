import type { SuperTest, Test } from 'supertest'
import supertest from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import { createApp, eventHandler, toNodeListener } from 'h3'
import type { App } from 'h3'
import { readBodyWithDefaults } from '../src'

describe('readBodyWithDefaults', () => {
  let app: App
  let request: SuperTest<Test>
  const bodyDefaults = {
    name: 'John',
    foo: 'bar',
  }

  beforeEach(() => {
    // Create App
    app = createApp({ debug: false })
    app.use('/defaults', eventHandler(async event => await readBodyWithDefaults(event, bodyDefaults)))

    request = supertest(toNodeListener(app))
  })

  it('body: has one default property', async () => {
    const { body, status } = await request.post('/defaults').send({ name: 'CP' })

    expect(status).toEqual(200)
    expect(body).toEqual(
      expect.objectContaining({
        name: 'CP',
        foo: bodyDefaults.foo,
      }),
    )
  })

  it('body: has both defaults properties', async () => {
    const res = await request.post('/defaults').send({})

    expect(res.status).toEqual(200)
    expect(res.body).toEqual(
      expect.objectContaining(bodyDefaults),
    )
  })
})
