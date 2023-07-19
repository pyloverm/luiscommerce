import React from 'react'
import Head from 'next/head'
const Maintenance = () => {
  return (
    <>
        <Head>
            <title>Manutenção do site</title>
        </Head>
        
        
        <article className='mnt'>
            <h1>Voltaremos em breve!</h1>
            <div>
                <p>Desculpem o incómodo, mas neste momento estamos a efectuar alguma manutenção. Se precisar, estaremos de volta online em breve!</p>
                <p>&mdash; Electromoveis equipa.</p>
            </div>
        </article>
    </>
  )
}

export default Maintenance