import { defu } from 'defu'
import { readBody } from 'h3'
import type { EventHandlerRequest, H3Event } from 'h3'
import type { IDefuDefaults } from './types'

/**
 * `readBodyWithDefaults` - Read the body of the request and merge it with the defaults.
 *
 * @param event - The h3 request event object.
 * @param defaults - The defaults to merge with the body.
 */
export async function readBodyWithDefaults<D extends IDefuDefaults>(event: H3Event<EventHandlerRequest>, defaults: D) {
  const body = await readBody(event)
  return defu(body, defaults) as D
}

/* @deprecated use `readBodyWithDefaults` */
/* c8 ignore next */
export const useBodyWithDefaults = readBodyWithDefaults
