import React from 'react'

import Head from 'next/head'
import Script from 'next/script'

import { client } from '../lib/client'
import { Product, FooterBanner , HeroBanner, DropMenu } from '../components'

const index = () => {
  return (
    <>
      <Head>
          <html lang='pt' id="html" class="" />
          <title>Document</title>
          <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'/>
          
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      </Head>
        <HeroBanner/>
          <div class="content">
              <DropMenu/>
              <div class="placehodling-content">
                  <img src="https://via.placeholder.com/1000x500" alt=""/>
                  <img src="https://via.placeholder.com/1000x500" alt=""/>
              </div>
          </div>
          <Script src="/static/script.js" />
    </>
  )
}

export default index