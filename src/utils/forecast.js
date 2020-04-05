const request = require('request')

const forecast = (latitude, longitude, callback ) => {
    const url = 'https://api.darksky.net/forecast/af51915674901b5bb101b62869312322/'+latitude+','+longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            // console.log(body.daily.data[0])
            const temp = body.currently.temperature
            const precip = body.currently.precipProbability
            const highTemp = body.daily.data[0].temperatureHigh
            const lowTemp = body.daily.data[0].temperatureLow
            const daily = body.daily.data[0].summary

            const forecast = daily + ' It is currently ' + temp + ' degrees out. There is ' + precip + ' chance of rain. The high is ' + highTemp + ' and the low is ' + lowTemp +'.'
            
            callback(undefined, forecast)        
        }

    })

} 

module.exports = forecast