import React from 'react'
import Image from 'next/image'

const Product = ({data}) => {

  var link_product = './produto/'+data.id
  if (data.imagem.includes("macorlux")) {
    data.imagem = data.imagem.replace("_1.jpg", "_destaque1.jpg");
  }
  return (
    <article class='product'>
      <a href={link_product}>

        {data.imagem && (<Image class='product-img' src={data.imagem} alt="" width={257} height={257} />)}

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