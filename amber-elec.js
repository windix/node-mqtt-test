const { logAxiosError } = require('./utils')
const axios = require('axios').default

const { API_TOKEN, SITE_ID } = process.env

const API_ROOT = 'https://api.amber.com.au/v1'

const getCurrentPrice = async () => {
  const url = `${API_ROOT}/sites/${SITE_ID}/prices/current?resolution=30`

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    })
    return response.data[0]
  } catch (e) {
    logAxiosError(e)
    throw new Error('Failed to get current price')
  }
}

module.exports = {
  getCurrentPrice
}
