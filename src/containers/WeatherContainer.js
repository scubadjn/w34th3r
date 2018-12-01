import React from 'react';
import mockDataResult from '../test/mockDataResult'

export default class WeatherContainer extends React.Component {

  state = {
    loading: true,
    error: false,
    data: []
  }

  componentWillMount() {
    this.setState({
      data: mockDataResult,
      loading: false
    })
  }

  render() {
    const { data, loading, error } = this.state
    return this.props.children({ data, loading, error })
  }

}