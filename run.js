require('dotenv').config()

const cron = require('node-cron')
const { format } = require('date-fns')
const { log, logError } = require('./utils')
const { getCurrentPrice } = require('./amber-elec')
const { setPumpStatus } = require('./pump-mqtt')

const topic = 'zigbee2mqtt/plug2'
const priceThreshold = 10
const hoursToRun = 3

let totalHours = 0.0
let pumpOn = false

cron.schedule('1,31 * * * *', async () => {
  console.log(`Running at ${format(new Date(), 'HH:mm:ss')}`)

  try {
    const currentPrice = await getCurrentPrice()
    log(currentPrice)

    if (currentPrice.perKwh < priceThreshold + 0.01 && totalHours < hoursToRun) {
      console.log(`Start pump for the next 30 minutes with price ${currentPrice.perKwh}, total hours = ${totalHours}`)
      totalHours += 0.5
      pumpOn = true

    } else {
      if (pumpOn) {
        console.log(`Stop pump`)
        pumpOn = false
      }
    }

    await setPumpStatus(topic, pumpOn)

  } catch (e) {
    logError(e)
    // force turning pump off
    await setPumpStatus(topic, false)

    console.log('EXIT...')
    process.exit(1)
  }
})
