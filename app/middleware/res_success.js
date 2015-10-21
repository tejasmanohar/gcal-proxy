
/*
 * Successful response handler
 */
export default function(req, res, next) {
  // define custom response function
  res.success = obj => {
    // report to client
    return res.json({
      success: true,
      // nest response under `data: {}`
      data: obj
    })
  }

  next()
}
