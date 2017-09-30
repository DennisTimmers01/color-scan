import React, { Component } from 'react'
import nearestColor from 'nearest-color'
import Vibrant from 'node-vibrant'
import NearestColorForm from './components/NearestColorForm'
import ExtractColorForm from './components/ExtractColorForm'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      colors: {
        red: '#f00',
        yellow: '#ff0',
        blue: '#00f'
      },
      vibrantColors: ['rgb(243, 22, 10)'],
      nearestColorValue: '',
      nearestColorResult: '',
      imageUrl: 'http://weknowyourdreams.com/images/autumn/autumn-02.jpg'
    }

    this.changeHandler = this.changeHandler.bind(this)
    this.getNearestColor = this.getNearestColor.bind(this)
    this.extractColorFromImage = this.extractColorFromImage.bind(this)
  }

  getNearestColor (e) {
    e.preventDefault()
    const { colors, nearestColorValue } = this.state
    const newNearestColor = nearestColor.from(colors)(nearestColorValue)
    this.setState({
      nearestColorResult: newNearestColor.value,
      nearestColorValue: ''
    })
  }

  extractColorFromImage (e) {
    e.preventDefault(e)
    const { imageUrl, vibrantColors } = this.state
    Vibrant.from(imageUrl).getPalette()
      .then(palette => this.convertToRGB(palette.Vibrant._rgb[0], palette.Vibrant._rgb[1], palette.Vibrant._rgb[2]))
      .then(palette => this.setState({
        vibrantColors: [...vibrantColors, palette]
      }))
  }

  changeHandler ({ target }) {
    this.setState({ [target.name]: target.value })
  }

  convertToRGB (r, g, b) {
    return `rgb(${r}, ${g}, ${b})`
  }

  render () {
    const { nearestColorValue, imageUrl } = this.state
    return (
      <div className='App'>
        <NearestColorForm
          value={nearestColorValue}
          onChange={this.changeHandler}
          onSubmit={this.getNearestColor}
        />
        <ExtractColorForm
          value={imageUrl}
          onChange={this.changeHandler}
          onSubmit={this.extractColorFromImage}
        />
      </div>
    )
  }
}

export default App
