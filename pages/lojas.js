import React from 'react'

import Head from 'next/head'
import Script from 'next/script'

import { client } from '../lib/client'
import { Product, FooterBanner , HeroBanner, DropMenu ,DropMenu2} from '../components'

const lojas = ({novidades}) => {
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
              <DropMenu DropMenu = {novidades.length && novidades}/>
              <DropMenu2/>
              <div class="placehodling-content">
                <h1 class='mapTitle'>A nossa loja de móveis e electrodomésticos</h1>
                <iframe  class='mapContainer'src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755.7265891310745!2d-7.733645348352657!3d40.742086019262295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd3cb453579967e3%3A0xa3df86a14fe1a612!2sElectro%20M%C3%B3veis!5e0!3m2!1sfr!2spt!4v1669775872933!5m2!1sfr!2spt"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <FooterBanner/>
          </div>
          <Script src="/static/script.js" />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "novidades"]';
  const novidades = await client.fetch(query);
  return {
    props: {novidades}
  }
}
export default lojas