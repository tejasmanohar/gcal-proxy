
/**
 * Module dependencies
 */

// import resources
import * as authentication from '../app/controllers/authentication_controller'
import * as calendar from '../app/controllers/calendars_controller'

// import middleware
import resError from '../app/middleware/res_error'
import resSuccess from '../app/middleware/res_success'


/**
 * Routes
 */

export default function(router) {
  // middleware
  applyMiddleware(router)

  // resources
  auth(router)
  calendars(router)
}

function applyMiddleware(router) {
  router.use(resError)
  router.use(resSuccess)
}

function auth(router) {
  router.get('/authenticate', authentication.initiate)
  router.get('/authenticate/callback', authentication.callback)
}

function calendars(router) {
  router.get('/calendars', calendar.index)
  router.get('/calendars/:id/events', calendar.events)
}
