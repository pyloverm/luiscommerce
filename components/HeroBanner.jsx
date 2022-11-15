import React from 'react'
import Link from 'next/Link'

const HerroBanner = () => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'> Small text</p>
        <h3>Mid text</h3>
        <img src="" alt="headphones" className='hero-banner-image'/>
        <div>
          <Link href="/product/ID">
            <button type='button'>Button text</button>
          </Link>
          <div className='desc'>
            <h5>description</h5>
            <p>DESCRIPTION</p>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default HerroBanner