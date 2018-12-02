import mockDataResult from './mockDataResult'
import mockXmlResponseString from './mockXmlResponseString'
import { transformXmlToJson } from '../containers/WeatherContainer'

test('that xml is parsed and mapped to json data', async () => {
  expect.assertions(2)
  transformXmlToJson(mockXmlResponseString, (err, { data }) => {
    expect(err).toBe(null)
    expect(data).toEqual(mockDataResult)
  })
})
