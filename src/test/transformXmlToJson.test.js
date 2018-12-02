import mockDataResult from './mockDataResult'
import mockXmlResponseString from './mockXmlResponseString'
import { transformXmlToJson } from '../containers/WeatherContainer'

test('that xml is parsed and mapped to json data', () => {
  expect.assertions(2)
  transformXmlToJson(mockXmlResponseString, (err, { data }) => {
    expect(err).toBe(null)
    expect(data).toEqual(mockDataResult)
  })
})

test('that invalid parsed xml string gives an error', () => {
  expect.assertions(2)
  transformXmlToJson('invalid xml string', (err, result) => {
    expect(!!err).toBe(true)
    expect(result).toBe(null)
  })
})


test('failed to map xml to json gives an error', () => {
  expect.assertions(2)
  transformXmlToJson('<root>Hello world!</root>', (err, result) => {
    expect(!!err).toBe(true)
    expect(result).toBe(null)
  })
})
