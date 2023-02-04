import React from 'react'
import Image from 'next/image'

const Product = ({data}) => {

  var link_product = './produto/'+data.id
  var image_pre_url = 'https://poor-camera.pockethost.io/api/files/'+data.collectionId + '/' + data.id + '/' 
  if (data.imagem.includes("macorlux")) {
    data.imagem = data.imagem.replace("_1.jpg", "_destaque1.jpg");
  }
  console.log('data')
  console.log(data)
  return (
    <article className='product'>
      <a href={link_product}>
        <div className='imagecenter'>
          {!data.iternal_product && data.imagem && (<Image className='product-img' src={data.imagem} alt="" width={257} height={257} />)}
          {data.iternal_product && (<Image className='product-img' src={image_pre_url+data.imagems[0]} alt="" width={257} height={257} />)}
        </div>
        <div>
          <p></p>
          <p className='desc'>{data.nome}</p>
          <p className='price'>{Math.round(data.preco)}€</p>
        </div>
      </a>
    </article>
    
  )
}

export default Product