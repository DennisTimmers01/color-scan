import React, { Component } from 'react'
import nearestColor from 'nearest-color'
import NearestColorForm from './components/NearestColorForm'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      colorPalettes: [
        {
          name: 'first palette',
          colors: {
            DarkMuted: '#543829',
            DarkVibrant: '#581609',
            LightMuted: '#bf8b71',
            LightVibrant: '#f4b484',
            Muted: '#986b59',
            Vibrant: '#b66e55'
          }
        }, {
          name: 'second palette',
          colors: {
            DarkMuted: '#541829',
            DarkVibrant: '#581609',
            LightMuted: '#bf8b73',
            LightVibrant: '#f4c484',
            Muted: '#986b19',
            Vibrant: '#b65e44'
          }
        }
      ],
      vibrantColors: ['#b66e55', '#b65e44'],
      nearestColorValue: '',
      nearestColorResult: '',
      finalPalette: {}
    }

    this.changeHandler = this.changeHandler.bind(this)
    this.getNearestColor = this.getNearestColor.bind(this)
    this.findColorPalette = this.findColorPalette.bind(this)
  }

  getNearestColor (e) {
    e.preventDefault()
    const { vibrantColors, nearestColorValue } = this.state
    const newNearestColor = nearestColor.from(vibrantColors)(nearestColorValue)
    this.setState({
      nearestColorResult: newNearestColor,
      nearestColorValue: ''
    })
    setTimeout(() => { this.findColorPalette() }, 500)
  }

  findColorPalette () {
    const { nearestColorResult, colorPalettes } = this.state
    const findPalette = palette => palette.colors.Vibrant === nearestColorResult
    const correctPalette = colorPalettes.find(findPalette)
    this.setState({
      finalPalette: correctPalette
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
        <button onClick={this.findColorPalette}>get palette</button>
      </div>
    )
  }
}

export default App
