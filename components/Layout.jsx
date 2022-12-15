import React from 'react'
import Head from 'next/head'


const Layout = ({children}) => {
  return (
    <>
      <Head>
          <html lang='pt' id="html" class="" />
          <title>Document</title>
          <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'/>
          
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      </Head>
      {children}
    </>
  )
}


export default Layout