import React from 'react';
import { Text, ScrollView } from 'react-native';
import WeatherContainer from '../containers/WeatherContainer'
import ForecastWrapper from './ForecastWrapper'

export default () => {
  return (
    <WeatherContainer>
      {({ data, loading, error }) => {
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
            {data.map((item, index) => (
              <ForecastWrapper key={index} {...item} />
            ))}
          </ScrollView>
        )
      }}
    </WeatherContainer>
  )
}
