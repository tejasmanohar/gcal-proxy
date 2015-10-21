
/*
 * Erring response handler
 */
export default function(req, res, next) {
  // define custom response function
  res.error = (message, code = 400) => {
    // report to client
    return res.status(code).json({
      success: false,
      message: message
    })
  }

  next()
}
