import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default ({ time, imgUri, weatherCondition, temperatureCelcius, wind }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>{time}</Text>
        <Image
          style={styles.stretch}
          source={{ uri: imgUri }}
        />
      </View>
      <View>
        <Text>{weatherCondition}</Text>
        <Text>{temperatureCelcius} C</Text>
        <Text>{wind.condition} - {wind.speedMps} mps {wind.direction}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 150
  },
  stretch: {
    width: 100,
    height: 100
  }
})
