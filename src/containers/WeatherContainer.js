import React from 'react'
import { parseString } from 'react-native-xml2js'

export const transformXmlToJson = xmlString => new Promise((resolve, reject) =>
  parseString(xmlString, (err, res) => {
    if (err) {
      reject(err)
    }
    else if (!res.weatherdata || !res.weatherdata.forecast) {
      // TODO improve xml validation
      reject(new Error('Invalid xml'))
    }
    else {

      // extract data from xml
      let bundledDates = {}

      res.weatherdata.forecast.forEach(forecast => {
        forecast.tabular.forEach(tabular => {
          tabular.time.forEach(json => {

            const [date, time] = json.$.from.split('T')
            const forecast = {
              date,
              forecast: {
                time: time.substring(0, 5),
                weatherCondition: json.symbol[0].$.name,
                imgUri: `http://symbol.yr.no/grafikk/sym/b100/${json.symbol[0].$.var}.png`,
                temperatureCelcius: json.temperature[0].$.value,
                wind: {
                  condition: json.windSpeed[0].$.name,
                  speedMps: json.windSpeed[0].$.mps,
                  direction: json.windDirection[0].$.name
                }
              }
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

      resolve({
        data: Object.keys(bundledDates).map(forecastKey => {
          return bundledDates[forecastKey]
        })
      })
    }
  })
)


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

  fetchAndMapData = async () => {
    try {
      const xmlString = await this.fetchWeather()
      const { data } = await transformXmlToJson(xmlString)
      this.setState({
        data,
        loading: false,
        error: false
      })
    }
    catch (err) {
      this.setState({
        loading: false,
        error: true
      })
    }
  }

  refetchData = () => {
    this.setState({ loading: true })
    this.fetchAndMapData()
  }

  render() {
    const { data, loading, error } = this.state
    return this.props.children({
      data,
      loading,
      error,
      refetch: this.refetchData
    })
  }

  componentDidMount() {
    this.fetchAndMapData()
  }

}