import React, { useRef, useEffect} from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';

import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import getStripe from '../pages/api/auth/getStripe';



const Cart = () => {

  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove ,showCart,fee } = useStateContext();
  
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }
  
  useEffect(() => {
    if(showCart){
      document.getElementsByTagName("html")[0].classList.add('no-scroll')
    }
  }, [showCart])
  

  function closesidenav(){
    setShowCart(false)
    document.getElementsByTagName("html")[0].classList.remove('no-scroll')
  }
  var peso = 0
  cartItems.forEach(element => {
    peso += element.peso * element.quantity
  })

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
        type="button"
        className="cart-heading"
        onClick={() => closesidenav()}>
          <AiOutlineLeft />
          <span className="heading">O seu carrinho</span>
          <span className="cart-num-items">({totalQuantities} artigos)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>O seu carrinho está vazio!</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => closesidenav()}
                className="btn"
              >
                Voltar à inspiração
              </button>
            </Link>
          </div>
        )}

        <div className="product-container-bi">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div key={item.id} className="productcart-cont" >
              <div className="productcart" key={item.id}>
                {!item.iternal_product &&(<img src={item?.imagem} className="cart-product-image" />)}
                {item.iternal_product &&(<img src={ 'https://poor-camera.pockethost.io/api/files/'+item.collectionId + '/' + item.id + '/' + item?.imagems[0]} className="cart-product-image" />)}
                <div className="item-desc">
                  <div className="desc-price">
                    <h5>{item.nome}</h5>
                    <h4>ref. {item.ref}</h4>
                    <div className='price-and-bnt'>
                      <p>{Math.round(item.preco*100)/100}€</p>
                      <div className="quantity-desc">
                        <span className="minus" onClick={() => toggleCartItemQuanitity(item.id, 'dec') }>
                        <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span className="plus" onClick={() => toggleCartItemQuanitity(item.id, 'inc') }><AiOutlinePlus /></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="suppr-totalprice">
                  <p>{(Math.round((item.preco * item.quantity)*100)/100) }€</p>
                  <button
                        type="button"
                        className="remove-item"
                        onClick={() => onRemove(item)}
                      >
                    <FiTrash2/>
                  </button>
                  </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className='resumo'> 
              <h2>Resumo</h2>
            </div>
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>{Math.round(totalPrice*100)/100}€</h3>
            </div>
            <div className="total">
              <a href="/envios"><h3>Custos de envio:</h3></a>
              <h3>{Math.round(fee*100)/100}€</h3>
            </div>
            
            <div className="total final">
              <h3>Total:</h3>
              <h3>{Math.round((Math.round(totalPrice*100)/100 + Math.round(fee*100)/100)*100)/100}€</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pagar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


export default Cart