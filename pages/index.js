import React from 'react'

import Head from 'next/head'
import Script from 'next/script'

import { client } from '../lib/client'
import { Product, FooterBanner , HeroBanner, NovidadesMenu, EspacosMenu, ProdutosMenu } from '../components'

const Home = ({novidades,espacos}) => {
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
              <NovidadesMenu NovidadesMenu = {novidades.length && novidades}/>
              <ProdutosMenu/>
              <EspacosMenu EspacosMenu = {espacos.length && espacos}/>
              <div class="placehodling-content">
                  <img src="https://via.placeholder.com/1000x500" alt=""/>
                  <img src="https://via.placeholder.com/1000x500" alt=""/>
              </div>
              <FooterBanner/>
          </div>
          <Script src="/static/script.js" />
          {console.log(novidades)}
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "novidades"]';
  const novidades = await client.fetch(query);

  const query2 = '*[_type == "espacos"]';
  const espacos = await client.fetch(query2);
  return {
    props: {novidades,espacos}
  }
}
export default Home