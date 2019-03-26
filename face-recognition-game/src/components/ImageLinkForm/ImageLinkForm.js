import React from 'react'
import './ImageLinkForm.css'

export default function ImageLinkForm() {
  return (
    <div>
      <p className='f3'>{'This alien will detect faces in your pictures'}</p>
      <div className='center'>
        <div className='form center pa5 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='text'/>
          <button className='w-40 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
        </div>
      </div>
    </div>
  )
}
