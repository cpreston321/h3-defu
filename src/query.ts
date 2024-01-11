import { defu } from 'defu'
import { getQuery } from 'h3'
import type { EventHandlerRequest, H3Event } from 'h3'
import type { IDefuDefaults } from './types'

/**
 * `getQueryWithDefaults` - Read the query of the request and merge it with the defaults.
 *
 * @param event - The h3event object.
 * @param defaults - The defaults to merge with the query.
 */
export function getQueryWithDefaults<D extends IDefuDefaults>(event: H3Event<EventHandlerRequest>, defaults: D) {
  const query = getQuery(event)
  return defu(query, defaults) as D
}

/* @deprecated use `getQueryWithDefaults` */
/* c8 ignore next */
export const useQueryWithDefaults = getQueryWithDefaults
