import React from 'react'
import Head from 'next/head'
import {FooterBanner , HeroBanner, NovidadesMenu, EspacosMenu, ProdutosMenu } from '../components'
import Script from 'next/script'


const Layout = ({children,novidades,espacos,arbo}) => {
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
        <NovidadesMenu NovidadesMenu = {novidades.length && novidades}/>
        <ProdutosMenu Arbo = {Object.keys(arbo).length && arbo} />
        <EspacosMenu EspacosMenu = {espacos.length && espacos}/>
        {children}
      </div>
      <FooterBanner/>
      <Script src="/static/script.js" />
    </>
  )
}


export default Layout