const util = require('util')

const log = payload => {
  console.log(util.inspect(payload, { showHidden: false, depth: null, colors: true }))
}

const logError = payload => {
  console.error(util.inspect(payload, { showHidden: false, depth: null, colors: true }))
}

const logAxiosError = e => {
  // https://stackoverflow.com/questions/10729276/how-can-i-get-the-full-object-in-node-jss-console-log-rather-than-object
  const { status, data } = e.response
  logError({ status, data })
}

module.exports = {
  log,
  logError,
  logAxiosError
}
