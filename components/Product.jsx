import React from 'react'

const Product = ({data}) => {

  var link_product = './produto/'+data.id
  if (data.imagem.includes("macorlux")) {
    data.imagem = data.imagem.replace("_1.jpg", "_destaque1.jpg");
  }
  return (
    <article class='product'>
      <a href={link_product}>
        <img class='product-img' src={data.imagem} alt="" />
        <div>
          <p></p>
          <p class='desc'>{data.nome}</p>
          <p class='price'>{Math.round(data.preco)}€</p>
        </div>
      </a>
    </article>
    
  )
}

export default Product