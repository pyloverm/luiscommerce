import React from 'react'

const Product = ({data}) => {
  console.log(data)
  return (
    <article class='product'>
      <a href="#">
        <img class='product-img' src={data['Imagem']} alt="" />
        <div>
          <p class='desc'>{data['Nome']}</p>
          <p class='price'>{Math.round(data['Preco'])}€</p>
        </div>
      </a>
    </article>
    
  )
}

export default Product