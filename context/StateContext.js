import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
const Context = createContext();

export const StateContext = ({ children , req,res}) => {
  const cookies = getCookies({ req, res });
  console.log()
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(Number(cookies.totalPrice));
  const [totalQuantities, setTotalQuantities] = useState(cookies.totalQuantities != 'NaN' && cookies.totalQuantities != null ? Number(cookies.totalQuantities) : 0);
  const [qty, setQty] = useState(1);
  console.log(decodeURIComponent( escape( JSON.stringify(cookies.cartItems) ) ))

 
  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    console.log(product)
    const checkProductInCart = cartItems.find((item) => item.id === product.id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.preco * quantity);
    
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    setCookie('totalPrice', totalPrice + product.preco * quantity, { req, res, maxAge: 60 * 60 * 24 * 30});
    setCookie('totalQuantities', totalQuantities+quantity, { req, res, maxAge: 60 * 60 * 24 * 30});

    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct.id === product.id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }
    
    console.log(JSON.stringify([...cartItems, { ...product }]))
    setCookie('cartItems', JSON.stringify([...cartItems, { ...product }]), { req, res, maxAge: 60 * 60 * 24 * 30});
    toast.success(`${qty} ${product.name} added to the cart.`);
  } 

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item.id === product.id);
    const newCartItems = cartItems.filter((item) => item.id !== product.id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.preco * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item.id === id)
    index = cartItems.findIndex((product) => product.id === id);
    const newCartItems = cartItems.filter((item) => item.id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.preco)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.preco)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities 
      }}
    >
      {children}
    </Context.Provider>
  )
}


export const useStateContext = () => useContext(Context);