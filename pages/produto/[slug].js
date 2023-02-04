import React, { useState } from 'react';
import PocketBase from 'pocketbase';
import Script from 'next/script'
import { Product, FooterBanner , HeroBanner, NovidadesMenu, EspacosMenu, ProdutosMenu } from '../../components'
import Head from 'next/head';
import { useStateContext } from '../../context/StateContext';

function ProductPage({product}) {
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  var image_pre_url = 'https://poor-camera.pockethost.io/api/files/'+product.collectionId + '/' + product.id + '/' 
  function testing(){
    console.log('clicked');
  }

  function toTitleCase(string) {
  // Put the string in lower case
  string = string.toLowerCase();

  // Split the string into an array of words
  var words = string.split(' ');

  // Uppercase the first letter of the first word
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

  // Join the array of words back into a single string
  return words.join(' ');
  }
  
  function modifyString(string) {

    let txt = document.createElement("textarea");
    txt.innerHTML = string;
    string = txt.value;
    string = string.replace(/<br\s*\/?>/gi, ' ');
    string = string.replace(/<[^>]*>|&[^;]+;/g, function(match) {
      if (match[0] === '&') {
        return String.fromCharCode(match.slice(1, -1));
      }
      return '';
    });
  
    // Return the modified string
    return string;
  }

  return (
    <>
    <Head>
      <title>{toTitleCase(product.nome)}</title>
      <script src="/static/carousel.js" />
    </Head>
      <div className="placehodling-content">
        <div id="lightbox"></div>
        <div className="all-row">
          <div class = 'image-part'>
            <section className="carousel-container">
              {!product.iternal_product && (<img src={product.imagem} alt="" className="current-image"/>)}
              {product.iternal_product && (<img src={image_pre_url + product.imagems[0]} alt="" className="current-image"/>)}
              
              <ul className="next-list">
                {product.iternal_product && product.imagems.map(imagem =>
                  <li key={product.id}><img src={image_pre_url+imagem} alt="" className="image-of-list current-image-list"/></li>
                )}
              </ul>
            </section>
          </div>
          <div class = 'desc-part'>
            <h1 class = 'product-nome'>{toTitleCase(product.nome)}</h1>
            <strong className="base-price">{Math.round(product.preco)}&nbsp;€</strong>
            <hr data-v-6cc9fd2c=""></hr>
            <button id="Add_cart" type="button" onClick={() => onAdd(product, 1)} className="btn-comprar">
              Adicionar ao carrinho
            </button>
            <div className='preco-atributes'>
              <div className='portes'>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="100.000000pt" height="100.000000pt" viewBox="0 0 100.000000 100.000000" preserveAspectRatio="xMidYMid meet">
                  <g transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                    <path d="M824 824 c-6 -3 -96 -135 -200 -294 -104 -160 -192 -290 -195 -290 -3 0 -57 44 -120 98 -132 114 -148 124 -172 111 -39 -22 -20 -52 110 -164 156 -135 186 -157 204 -150 16 6 419 618 427 648 3 12 -2 25 -13 33 -20 15 -23 15 -41 8z"/>
                  </g>
                </svg>
                <a href='/envios'><p>Envio ao domicílio</p></a>
              </div>
              <p className='dispo'>Disponível</p>
              <hr data-v-6cc9fd2c=""></hr>
              <li key={product.id} ><a href='/devulocoes'>Devoluções</a></li>
              <li key={product.id}><a href='/Pagamento'>Pagamento 100% seguro</a></li>
            </div>
          </div>
        </div>
        <div className='column desc-col'>
          <h3 className='descricao'>Descrição</h3>
          <ul>
              {modifyString(product.descricao)}
          </ul>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const id = context.params.slug;
  const pb = new PocketBase('https://poor-camera.pockethost.io');
  const query_product = await pb.collection('products').getOne(id);
  const product = JSON.parse(JSON.stringify(query_product));
  return {
    props: {product}
  }
}

export default ProductPage