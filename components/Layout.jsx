import React from 'react'
import Head from 'next/head'
import {FooterBanner , HeroBanner, ProdutosMenuMoveis, EspacosMenu, ProdutosMenuElec } from '../components'
import Script from 'next/script'


const Layout = ({children,arbo2,espacos,arbo}) => {
  console.log('arbo2')
  console.log(arbo2)
  return (
    <>
      <Head>
          <html lang='pt' id="html" class="" />
          <title>Móveis | Electromóveis</title>
          <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      </Head>
      <HeroBanner/>
      <div class="content">
        <ProdutosMenuMoveis Arbo2 = {Object.keys(arbo2).length && arbo2}/>
        <ProdutosMenuElec Arbo = {Object.keys(arbo).length && arbo} />
        <EspacosMenu EspacosMenu = {espacos.length && espacos}/>
        {children}
      </div>
      <FooterBanner/>
      <Script src="/static/script.js" />
    </>
  )
}


export default Layout