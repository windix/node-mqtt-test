const MQTT = require('async-mqtt')
const { logError } = require('./utils')

const setPumpStatus = async (topic, on) => {
  const client = await MQTT.connectAsync(process.env.MQTT_SERVER)

  const state = on ? 'ON' : 'OFF'
  console.log(`Setting pump ${topic} status to ${state}`)

  try {
    console.log('START publish...')

    await client.publish(`${topic}/set`, JSON.stringify({
      state
    }))

    await client.end()

    console.log('DONE!')

    return true

  } catch (e) {
    logError(e)
    return false
  }
}

module.exports = {
  setPumpStatus
}
