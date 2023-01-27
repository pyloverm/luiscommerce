import '../styles/cart.css'
import '../styles/globals.css'
import '../styles/form.css'

import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent";
import { useRouter } from 'next/router';
import Router from "next/router";
import { Layout } from '../components'
import '../styles/family-inter.css'
import PocketBase from 'pocketbase';
import React, { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import { StateContext } from '../context/StateContext';


function MyApp({ Component, pageProps, ...appProps}) {

  const [state, setState] = useState({
    loading: true,
    arbo: [],
    espacos:[],
    novidades:[],
    last_update:[]
  });
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  
  useEffect(() => {
    const fetchData = async () => {
      try {

        const pb = new PocketBase('https://poor-camera.pockethost.io');
        const query_arbo = await pb.collection('structura').getFirstListItem('intern = False');
        const arbo = JSON.parse(JSON.stringify(query_arbo));
        const query_novidades = await pb.collection('novidades').getFullList();
        const novidades = JSON.parse(JSON.stringify(query_novidades));

        const query_espacos = await pb.collection('espacos').getFullList();
        const espacos = JSON.parse(JSON.stringify(query_espacos));

        setState({
          loading: false,
          arbo: arbo,
          espacos:espacos,
          novidades:novidades
        });

        // Store data in local storage
        localStorage.setItem('arbo', JSON.stringify(arbo));
        localStorage.setItem('espacos', JSON.stringify(espacos));
        localStorage.setItem('novidades', JSON.stringify(novidades));
        let now = new Date();
        let month = now.getMonth() + 1;  // Returns a number 0-11 representing the month
        let date =  now.getFullYear()+'-'+month+'-'+now.getDate()
        localStorage.setItem('last_update', JSON.stringify(date));
      } catch (error) {
        console.error(error);
      }
    }
    const arbo = localStorage.getItem('arbo');
    const espacos = localStorage.getItem('espacos');
    const novidades = localStorage.getItem('novidades');
    const last_update = localStorage.getItem('last_update');

    let now = new Date();
    let month = now.getMonth() + 1;
    let date =  '"'+now.getFullYear()+'-'+month+'-'+now.getDate()+'"'

    if (arbo && espacos && novidades && last_update === date) {
      setState({
        loading: false,
        arbo: JSON.parse(arbo),
        espacos: JSON.parse(espacos),
        novidades: JSON.parse(novidades),
        last_update: JSON.parse(last_update)
      });
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    Router.isReady && setIsLoading(false)
  }, []);
  
  if (state.loading) {
    return (
      <div class='spinner-wrapper'>
      <div class="spinner"></div></div>
    );
  }

  if (appProps.router.asPath.includes('/maintenance'))
    return <Component {...pageProps}/>;
  
  return (
    <StateContext>
      <Layout novidades = {state.novidades}  espacos = {state.espacos} arbo = {state.arbo}>
        <Toaster />
        {isLoading ? <>loading...</> : <Component {...pageProps} />}
        <Analytics />
      </Layout>
    </StateContext> 
  )
}




export default MyApp
