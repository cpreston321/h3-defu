
import { defu } from 'defu'
import { readBody, CompatibilityEvent } from 'h3'

import type { IDefuDefaults } from './types'

/**
 * `readBodyWithDefaults` - Read the body of the request and merge it with the defaults.
 *
 * @param {CompatibilityEvent} event - The event object.
 * @param {object} defaults - The defaults to merge with the body.
 */
export async function readBodyWithDefaults<D extends IDefuDefaults> (event: CompatibilityEvent, defaults: D) {
  const body = await readBody(event)
  return defu(body, defaults) as D
}

/* @deprecated use `readBodyWithDefaults` */
/* c8 ignore next */
export const useBodyWithDefaults = readBodyWithDefaults
