
/*!
 * Module dependencies.
 */

var path = require('path')
var rootPath = path.resolve(__dirname + '../..')

/**
 * Expose config
 */

module.exports = {
  development: {
    root: rootPath,
    db: 'mongodb://localhost/messaging',
    email: {
      host: "email-smtp.us-east-1.amazonaws.com",
      port: 25,
      ssl: true,
      user: "AKIAIPMVUFRFPWAQG7RA",
      password: "WyI9YKA9L3LN0R9jbDQ3wZFiTStP0pyZQrE0mcQX"
    },
    gcm: {
      serverAccessKey: "AIzaSyBOhlCdC8K9dAqT39Co3xvdILX5yASYn78",
      projectNumber: 983051331819
    }
  },
  test: {
    root: rootPath,
    db: 'mongodb://localhost/test-collection'
  },
  staging: {
    root: rootPath,
    db: process.env.MONGOHQ_URL
  },
  production: {
    root: rootPath,
    db: process.env.MONGOHQ_URL
  }
}
