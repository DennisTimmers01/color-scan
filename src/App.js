import React, { Component } from 'react'
import nearestColor from 'nearest-color'
import NearestColorForm from './components/NearestColorForm'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      colorPalettes: [
        {
          name: 'autumn',
          colors: {
            DarkMuted: '#543829',
            DarkVibrant: '#581609',
            LightMuted: '#bf8b71',
            LightVibrant: '#f4b484',
            Muted: '#986b59',
            Vibrant: '#b66e55'
          }
        }
      ],
      vibrantColors: {
        autumn: '#b66e55'
      },
      nearestColorValue: '',
      nearestColorResult: ''
    }

    this.changeHandler = this.changeHandler.bind(this)
    this.getNearestColor = this.getNearestColor.bind(this)
  }

  getNearestColor (e) {
    e.preventDefault()
    const { vibrantColors, nearestColorValue } = this.state
    const newNearestColor = nearestColor.from(vibrantColors)(nearestColorValue)
    this.setState({
      nearestColorResult: newNearestColor.value,
      nearestColorValue: ''
    })
  }

  changeHandler ({ target }) {
    this.setState({ [target.name]: target.value })
  }

  render () {
    const { nearestColorValue } = this.state
    return (
      <div className='App'>
        <NearestColorForm
          value={nearestColorValue}
          onChange={this.changeHandler}
          onSubmit={this.getNearestColor}
        />
      </div>
    )
  }
}

export default App
