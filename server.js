
/**
 * Module dependencies
 */

import bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan'

import errorHandler from './app/middleware/error_handler'
import routes from './config/routes'

// init express app
const app = express()

// request logging
app.use(morgan({
  'development': 'dev',
  'staging': 'combined',
  'production': 'common'
}[process.env.NODE_ENV] || 'dev'))

// body parser to populate req.body
app.use(bodyParser.json())

// without object type restrictions
app.use(bodyParser.urlencoded({
  extended: true
}))

// router
const router = require(`express-promise-router`)()
routes(router)
app.use(`/`, router)

app.use(errorHandler)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
