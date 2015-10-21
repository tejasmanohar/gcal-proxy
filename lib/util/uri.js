
/**
 * Module dependencies
 */

import humps from 'humps'
import queryString from 'qs'


/**
 * Build decamelized, parametized URL
 * @param {string} baseUrl - Base URL
 * @param {Object} params - Query parameters for GCal API call
 */
export function buildDecamelizedUri({ baseUrl, params }) {
  // convert { aKey: 2 } to a_key=2
  const queryParams = queryString.stringify(humps.decamelizeKeys(params))
  return `${baseUrl}?${queryParams}`
}
