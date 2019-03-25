import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import ufo from './ufo.png'

export default function Logo() {
  return (
    <div className='ma4 mt0'>
          <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 200, width: 200 }} >
              <div className="Tilt-inner"> <img style={{paddingTop: '45px'}} src={ufo} alt="logo"/></div>
          </Tilt>
    </div>
  )
}
