import React from 'react'

const NearestColorForm = ({onChange, onSubmit}) => (
  <form onSubmit={onSubmit}>
    <input
      type='text'
      name='nearestColorValue'
      onChange={onChange}
    />
    <button>NearestColor</button>
  </form>
)

export default NearestColorForm
