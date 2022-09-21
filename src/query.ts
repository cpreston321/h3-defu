
import { defu } from 'defu'
import { getQuery, CompatibilityEvent } from 'h3'

import type { IDefuDefaults } from './types'

/**
 * `getQueryWithDefaults` - Read the query of the request and merge it with the defaults.
 *
 * @param {CompatibilityEvent} event - The event object.
 * @param {object} defaults - The defaults to merge with the query.
 */
export function getQueryWithDefaults<D extends IDefuDefaults> (event: CompatibilityEvent, defaults: D) {
  const query = getQuery(event)
  return defu(query, defaults) as D
}

/* @deprecated use `readBodyWithDefaults` */
/* c8 ignore next */
export const useQueryWithDefaults = getQueryWithDefaults
