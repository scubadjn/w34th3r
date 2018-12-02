import mockDataResult from './mockDataResult'
import mockXmlResponseString from './mockXmlResponseString'
import { transformXmlToJson } from '../containers/WeatherContainer'

test('that xml is parsed and mapped to json data', async () => {
  expect.assertions(1)
  try {
    const { data } = await transformXmlToJson(mockXmlResponseString)
    expect(data).toEqual(mockDataResult)
  }
  catch {
  }
})

test('that invalid parsed xml string gives an error', () => {
  expect.assertions(1)
  try {
    await transformXmlToJson('invalid xml string')
  }
  catch (err) {
    expect(!!err).toBe(true)
  }
})


test('failed to map xml to json gives an error', () => {
  expect.assertions(1)
  try {
    await transformXmlToJson('<root>Hello world!</root>')
  }
  catch (err) {
    expect(!!err).toBe(true)
  }
})
