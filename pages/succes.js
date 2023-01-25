import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Obrigado pela sua encomenda!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
            Se tiver alguma questão, por favor envie um e-mail 
          <a className="email" href="mailto:order@example.com">
            electromoveis@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            voltar à inspiração
          </button>
        </Link>
      </div>
    </div>
  )
}
