import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import ufo from './ufo.png'

export default function Logo() {
  return (
    <div className='ma4 mt0'>
          <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
              <div className="Tilt-inner"> <img style={{paddingTop: '25px'}} src={ufo} alt="logo"/></div>
          </Tilt>
    </div>
  )
}
