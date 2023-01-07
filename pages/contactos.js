import React from 'react'
import PocketBase from 'pocketbase';

const contactos = ({data}) => {
    return(
        <p>{data.items[0].nome}</p>
    )
}


export const getServerSideProps = async () => {
    const pb = new PocketBase('https://poor-camera.pockethost.io');
    const records = await pb.collection('products').getList(1,200, {sort: '-created',});
    const data = JSON.parse(JSON.stringify(records))
    return {
      props: {data}
    }
  }
export default contactos