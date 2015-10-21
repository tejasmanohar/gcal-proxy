
/**
 * Module dependencies
 */

import * as gCal from '../../lib/google_calendar'


/**
 * GET all calendars
 */
export async function index(req, res) {
  res.success(await gCal.getCalendars({ accessToken: req.query.access_token }))
}

/**
 * Get events by :calendar
 */
export async function events(req, res) {
  res.success(await gCal.getEvents({
    calendar: req.params.id,
    accessToken: req.query.access_token
  }))
}
