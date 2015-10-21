
/**
 * Module dependencies
 */

import * as gAuth from '../../lib/google_oauth'


// define base request for oauth flow
const baseRequest = {
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI
}

/**
 * Initiate authentication process
 * - POST /authenticate
 */
export function initiate(req, res) {
  // use Object#assign to merge base request with
  res.redirect(gAuth.buildRedirectUri(Object.assign({
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    responseType: 'code'
  }, baseRequest)))
}

/**
 * Post-authentication callback
 * - POST /authenticate/callback
 */
export async function callback(req, res) {
  res.success(await gAuth.getAccessToken(Object.assign({
    code: req.query.code,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET
  }, baseRequest)))
}
