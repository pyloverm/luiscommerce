import React from 'react'

import { client } from '../lib/client'
import { Product, FooterBanner , HeroBanner } from '../components'

const index = () => {
  return (
    <>
      <HeroBanner/>
      <div className="products-heading">
        <h2> best selling products</h2>
        <p>speakers</p>
      </div>
      <div className="products-container">
        {['product 1', 'product 2'].map((product) => product)}
      </div>

      <FooterBanner/>
    </>
  )
}

export default index