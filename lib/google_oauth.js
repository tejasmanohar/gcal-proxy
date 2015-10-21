
/**
 * Module dependencies
 */

import { decamelizeKeys } from 'humps'
import request from 'superagent-bluebird-promise'

import { buildDecamelizedUri } from './util/uri'


/**
 * Build Google OAuth Redirect URI given options
 * @param {Object} options - Query Parameter options for OAuth
 */
export function buildRedirectUri(params) {
  const baseUrl = 'https://accounts.google.com/o/oauth2/auth'
  return buildDecamelizedUri({ baseUrl, params })
}

/**
 * Return access token given authorization code
 * @param {object} - code, client id, client secret, and redirect uri for auth flow
 */
export async function getAccessToken({ code, clientId, clientSecret, redirectUri }) {
  const baseUrl = 'https://www.googleapis.com/oauth2/v3/token'

  return await request
                 .post(buildDecamelizedUri({ baseUrl, params: arguments[0] }))
                 // merge decamelized parameters with { grant_type: 'authorization_code' }
                 .send(Object.assign(decamelizeKeys(arguments[0]), {
                    grant_type: 'authorization_code'
                  }))
                 // x-www-form-urlencoded
                 .type('form')
}
