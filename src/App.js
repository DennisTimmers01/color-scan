import React, { Component } from 'react'
import nearestColor from 'nearest-color'
import NearestColorForm from './components/NearestColorForm'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      colors: {
        red: '#f00',
        yellow: '#ff0',
        blue: '#00f'
      },
      nearestColorValue: ''
    }

    this.changeHandler = this.changeHandler.bind(this)
    this.getNearestColor = this.getNearestColor.bind(this)
  }

  getNearestColor (e) {
    e.preventDefault()
    const { colors, nearestColorValue } = this.state
    const newNearestColor = nearestColor.from(colors)(nearestColorValue)
    console.log(newNearestColor)
  }

  changeHandler ({ target }) {
    this.setState({ [target.name]: target.value })
  }

  render () {
    return (
      <div className='App'>
        <NearestColorForm
          onChange={this.changeHandler}
          onSubmit={this.getNearestColor}
        />
      </div>
    )
  }
}

export default App
