
/**
 * Module dependencies
 */

import request from 'superagent-bluebird-promise'

import { buildDecamelizedUri } from './util/uri'


/**
 * Returns entries on the user's calendar list
 * @param {string} accessToken - Authorization token
 * @param {Object} options - Query Parameter options
 */
export async function getCalendars({ accessToken, params }) {
  const baseUrl = 'https://www.googleapis.com/calendar/v3/users/me/calendarList'

  // request calendar list from gcal api
  const res = await request
                      .get(buildDecamelizedUri({ baseUrl, params }))
                      .set('Authorization', `Bearer ${accessToken}`)

  // transform gcal response -> proxy response
  return res.body.items.map(cal => ({
    id: cal.id,
    color: cal.backgroundColor.substr(1),
    selected: cal.selected || false,
    writable: isEditable(res.body.accessRole),
    title: cal.summaryOverride || cal.summary,
    timezone: cal.timeZone
  }))
}

/**
 * Returns events on the specified calendar
 * @param {string} calendar - Calendar ID
 * @param {string} accessToken - Authorization token
 * @param {Object} options - Query Parameter options
 */
export async function getEvents({ calendar, accessToken, params }) {
  // build request url with base and calendarId
  const baseUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendar}/events`

  // request events list from gcal api
  const res = await request
                      .get(buildDecamelizedUri({ baseUrl, params }))
                      .set('Authorization', `Bearer ${accessToken}`)

  // transform gcal response -> proxy response
  return res.body.items.map(ev => ({
    id: ev.id,
    start: ev.start,
    end: ev.end,
    location: ev.location,
    attendees: formatAttendees(ev.attendees),
    status: ev.status,
    organizer: formatAttendee(ev.organizer),
    editable: isEditable(res.body.accessRole)
  }))
}

/**
 * Returns editability based on access role
 * @param {string} accessRole - User's access role on resource
 */
function isEditable(accessRole) {
  return !!~['owner', 'writer'].indexOf(accessRole)
}

/**
 * Returns formatted attendees given GCal attendees[]
 * @param {Object[]} attendees - Raw event attendees from GCal API response
 */
function formatAttendees(attendees) {
  if (attendees) return attendees.map(formatAttendee)
}

/**
 * Returns formatted attendee given raw attendee
 * @param {Object} attendee - Individual event attendees[i] from GCal API response
 */
function formatAttendee(attendee) {
  return {
    name: attendee.displayName,
    emails: [attendee.email],
    self: !!attendee.self
  }
}
