import React from 'react';
import { parseString } from 'react-native-xml2js'

export const transformXmlToJson = (xmlString, callback) => {
  parseString(xmlString, (err, res) => {
    if (err) {
      callback(err, null)
    }
    else if (!res.weatherdata || !res.weatherdata.forecast) {
      // TODO throw an error if xml data is invalid
      callback(true, null)
    }
    else {

      // extract data from xml
      let bundledDates = {}

      res.weatherdata.forecast.forEach(forecast => {
        forecast.tabular.forEach(tabular => {
          tabular.time.forEach(time => {
            let forecast = { forecast: {} }
            forecast.date = time.$.from.split('T')[0]
            forecast.forecast.time = time.$.from.split('T')[1].substring(0, 5)
            forecast.forecast.weatherCondition = time.symbol[0].$.name
            forecast.forecast.imgUri = `http://symbol.yr.no/grafikk/sym/b100/${time.symbol[0].$.var}.png`
            forecast.forecast.temperatureCelcius = time.temperature[0].$.value
            forecast.forecast.wind = {
              condition: time.windSpeed[0].$.name,
              speedMps: time.windSpeed[0].$.mps,
              direction: time.windDirection[0].$.name
            }

            // bundle forecastes by date
            if (!bundledDates[forecast.date]) {
              bundledDates[forecast.date] = {}
              bundledDates[forecast.date].date = forecast.date
              bundledDates[forecast.date].forecasts = []
            }
            bundledDates[forecast.date].forecasts.push(forecast.forecast)
          })
        })
      })

      // convert to array
      let data = []
      Object.keys(bundledDates).forEach(forecastKey => {
        data.push(bundledDates[forecastKey])
      })

      callback(null, { data })

    }
  })
}

export default class WeatherContainer extends React.Component {

  state = {
    loading: true,
    error: false,
    data: []
  }

  fetchWeather = async () => {
    try {
      const url = 'https://www.yr.no/place/Sweden/Norrbotten/Lule%C3%A5/forecast.xml'
      const response = await fetch(url)
      return await response.text()
    }
    catch (err) {
      throw new Error(err)
    }
  }

  componentWillMount() {
    this.fetchWeather()
      .then(xmlString => {
        transformXmlToJson(xmlString, (err, { data }) => {
          if (err) {
            this.setState({
              loading: false,
              error: true
            })
          }

          this.setState({
            data,
            loading: false,
            error: false
          })

        })
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true
        })

      })
  }

  render() {
    const { data, loading, error } = this.state
    return this.props.children({ data, loading, error })
  }

}