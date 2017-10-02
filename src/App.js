import React, { Component } from 'react'
import nearestColor from 'nearest-color'
import Vibrant from 'node-vibrant'
import NearestColorForm from './components/NearestColorForm'
import ExtractColorForm from './components/ExtractColorForm'
import { toRGB, rgbToHex } from './utils/helpers'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      colorPalettes: [],
      vibrantColors: [],
      nearestColorValue: '',
      nearestColorResult: '',
      imageUrl: 'https://images.pexels.com/photos/355302/pexels-photo-355302.jpeg?h=350&auto=compress&cs=tinysrgb'
    }

    this.changeHandler = this.changeHandler.bind(this)
    this.getNearestColor = this.getNearestColor.bind(this)
    this.extractColorFromImage = this.extractColorFromImage.bind(this)
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
    const findColorPalette = color => nearestColorResult === colorPalettes
    const result = colorPalettes.find(findColorPalette)
    console.log(result, colorPalettes)
  }

  extractColorFromImage (e) {
    e.preventDefault()
    const { imageUrl, vibrantColors, colorPalettes } = this.state
    Vibrant.from(imageUrl).getSwatches()
      .then(palette => this.getHexValues(palette))
      .then(palette => this.setState({
        vibrantColors: [...vibrantColors, palette],
        colorPalettes: [...colorPalettes, palette]
      }))
  }

  getHexValues (palette) {
    const hexValues = []
    for (const color in palette) {
      const RGBVal = toRGB(palette[color]._rgb)
      const hexVal = rgbToHex(RGBVal)

      hexValues.push(hexVal)
    }

    // const newPalette = {
    //   colors: {
    //     LightMuted: hexValues[0],
    //     LightVibrant: hexValues[1],
    //     DarkMuted: hexValues[2],
    //     DarkVibrant: hexValues[3],
    //     Muted: hexValues[4],
    //     Vibrant: hexValues[5]
    //   }
    // }

    const newPalette = [
      {'name': 'LightMuted', color: hexValues[0]},
      {'name': 'LightVibrant', color: hexValues[1]},
      {'name': 'DarkMuted', color: hexValues[2]},
      {'name': 'DarkVibrant', color: hexValues[3]},
      {'name': 'Muted', color: hexValues[4]},
      {'name': 'Vibrant', color: hexValues[5]}
    ]

    return newPalette
  }

  changeHandler ({ target }) {
    this.setState({ [target.name]: target.value })
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
