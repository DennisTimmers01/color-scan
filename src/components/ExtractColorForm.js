import React from 'react'

const ExtractColorForm = ({onSubmit, onChange, value}) => (
  <form onSubmit={onSubmit}>
    <input
      type='text'
      name='imageUrl'
      value={value}
      onChange={onChange}
    />
    <button>Extract colors</button>
  </form>
)

export default ExtractColorForm
