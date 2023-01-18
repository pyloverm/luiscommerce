import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie'
import PocketBase from 'pocketbase';

const Context = createContext();

export const  StateContext =  ({children}) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState((localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : []);
  const [totalPrice, setTotalPrice] = useState((localStorage.getItem('totalPrice')) ? Number(localStorage.getItem('totalPrice')) : 0);
  const [totalQuantities, setTotalQuantities] = useState((localStorage.getItem('totalQuantities')) ? Number(localStorage.getItem('totalQuantities')) : 0);
  const [qty, setQty] = useState(1);
  

  
  let foundProduct;
  let index;
  function addtostorage(cartits , totalpri , totalquant){
    localStorage.setItem('totalPrice', (totalpri))
    localStorage.setItem('totalQuantities', (totalquant))
    localStorage.setItem('cartItems', JSON.stringify(cartits))
  }
  const onAdd = (product, quantity) => {

    const checkProductInCart = cartItems.find((item) => item.id === product.id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.preco * quantity);
    localStorage.setItem('totalPrice', (totalPrice + product.preco * quantity))
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    localStorage.setItem('totalQuantities', (totalQuantities + quantity))

    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct.id === product.id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    } else {
      product.quantity = quantity;
      localStorage.setItem('cartItems', JSON.stringify([...cartItems, { ...product }]))
      setCartItems([...cartItems, { ...product }]);
    }
    
    toast.success(`${qty} ${product.name} added to the cart.`);
  } 



  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item.id === product.id);
    const newCartItems = cartItems.filter((item) => item.id !== product.id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.preco * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
    addtostorage(newCartItems,(totalPrice -foundProduct.preco * foundProduct.quantity),(totalQuantities - foundProduct.quantity))
  }


  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item.id === id)
    index = cartItems.findIndex((product) => product.id === id);
    const newCartItems = cartItems.filter((item) => item.id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.preco)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
      addtostorage([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ] ,  totalPrice + foundProduct.preco,totalQuantities + 1)
      
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.preco)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
        addtostorage([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ] ,  totalPrice - foundProduct.preco,totalQuantities - 1)
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