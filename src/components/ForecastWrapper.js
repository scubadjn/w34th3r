import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Forecast from './Forecast'

const ForecastWrapper = ({ date, forecasts }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {date}
      </Text>
      <View>
        {forecasts.map((forecast, index) => (
          <Forecast key={index} {...forecast} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff'
  }
})

export default ForecastWrapper