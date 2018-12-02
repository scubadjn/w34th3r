import React from 'react';
import { Text, ScrollView, Button, Linking } from 'react-native';
import WeatherContainer from '../containers/WeatherContainer'
import ForecastWrapper from './ForecastWrapper'



export default class WeatherFeed extends React.Component {

  openUrl = async () => {
    try {
      return await Linking.openURL("http://www.yr.no/place/Sweden/Norrbotten/Luleå/")
    }
    catch (err){
      throw new Error(err)
    }
  }

  render() {
    return (
      <WeatherContainer>
        {({ data, loading, error, refetch }) => {
          if (error) {
            return (
              <Text>Oops something went wrong</Text>
            )
          }
          if (loading) {
            return (
              <Text>Loading ...</Text>
            )
          }
          return (
            <ScrollView>
              <Button
                onPress={this.openUrl}
                color="#008000"
                title="Weather forecast from Yr, delivered by the Norwegian Meteorological Institute and the NRK"
              />
              {data.map((item, index) => (
                <ForecastWrapper key={index} {...item} />
              ))}
              <Button
                onPress={refetch}
                color="#008000"
                title="reload"
              />
            </ScrollView>
          )
        }}
      </WeatherContainer>
    )
  }

  componentDidMount() {
    Linking.addEventListener('url', this.openUrl);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.openUrl);
  }

}
