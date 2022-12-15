import React from 'react'
import { Title } from '../src/data'
import PocketBase from 'pocketbase';

const contacts = ({data}) => {
    return(
        <p>{data[0].nome}</p>
    )
}


// you can also fetch all records at once via getFullList


export const getServerSideProps = async () => {
    const pb = new PocketBase('https://poor-camera.pockethost.io');
    const records = await pb.collection('products').getFullList(200, {sort: '-created',});
    const data = JSON.parse(JSON.stringify(records))
    return {
      props: {data}
    }
  }
export default contacts