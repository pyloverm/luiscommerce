import React from 'react'

import Head from 'next/head'
import Script from 'next/script'

import { getData } from './api/products'
import { client } from '../lib/client'
import { Product, FooterBanner , HeroBanner, NovidadesMenu, EspacosMenu, ProdutosMenu } from '../components'

const Home = ({novidades,espacos,product_1}) => {
  return (
    <>
        <HeroBanner/>
          <div class="content">
            <NovidadesMenu NovidadesMenu = {novidades.length && novidades}/>
            <ProdutosMenu/>
            <EspacosMenu EspacosMenu = {espacos.length && espacos}/>
            <div class="placehodling-content">
              <div class='product-container'>
                <Product data = {product_1}/>
              </div>
              <img src="https://via.placeholder.com/1000x500" class='placehodling-content' alt=""/>
              <img src="https://via.placeholder.com/1000x500" class='placehodling-content' alt=""/>
            </div>
            <FooterBanner/>
          </div>
          <Script src="/static/script.js" />
          {console.log(novidades)}
    </>
  )
}

export const getServerSideProps = async () => {
  const product_1 = await getData();
  const query = '*[_type == "novidades"]';
  const novidades = await client.fetch(query);

  const query2 = '*[_type == "espacos"]';
  const espacos = await client.fetch(query2);
  return {
    props: {novidades,espacos,product_1}
  }
}
export default Home