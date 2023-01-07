import React from 'react'
import PocketBase from 'pocketbase';
import { Product } from '../components'

const Home = ({product_1,product_2}) => {
  

  return (
    <>
      <div class="placehodling-content">
            <div class='product-container'>
              <Product data = {product_1}/>
              <Product data = {product_2}/>
            </div>
            <img src="https://via.placeholder.com/1000x500" class='placehodling-content' alt=""/>
            <img src="https://via.placeholder.com/1000x500" class='placehodling-content' alt=""/>
      </div>
    </>
  )
}



export const getServerSideProps = async () => {

  const pb = new PocketBase('https://poor-camera.pockethost.io');
  const records = await pb.collection('products').getFirstListItem('nome ~ "PLACA"');
  const record = await pb.collection('products').getFirstListItem('nome ~ "FL"');
  const product_1 = JSON.parse(JSON.stringify(records));
  const product_2 = JSON.parse(JSON.stringify(record));
  return {
    props: {product_1,product_2}
  }
}




export default Home