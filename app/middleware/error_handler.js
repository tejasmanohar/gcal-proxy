
/*
 * Module dependencies
 */
import HttpError from 'http-error'

/*
 * Server error handler
 */
export default function(err, req, res, next) {
  const httpError = new HttpError[err.status || 500](err.message)

  res.status(httpError.code).json({
    success: false,
    message: httpError.message
  })
}
