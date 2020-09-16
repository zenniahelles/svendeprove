import React, { useEffect, useState } from 'react'
import './GetCart.scss'
import { Link } from 'react-router-dom';

function GetCart(props) {

    const [cart, setCart] = useState([])

// Fetch af kurv indholdet:

    const getCart = async () => {
        let options = {
            headers: {
                'Authorization': `Bearer ${props.loginData.access_token}`
            }
        }
        try {
            const url = `https://api.mediehuset.net/stringsonline/cart`
            const response = await fetch(url, options);
            const data = await response.json();
            setCart(data);
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      getCart()
    }, [])
    
    useEffect(() => {
        if (props.loginData.access_token) {
            getCart()
        }
    }, [props.loginData])

    //--------- Fjern et produkt:

    const deleteProduct = async (selectedID) => {

        let formData = new FormData()
        formData.append("product_id", selectedID)
  
        let options = {
          method: "DELETE",
          body: formData,
          headers: {
              'Authorization': `Bearer ${props.loginData.access_token}`
          }
      }
      try {
          const url = `https://api.mediehuset.net/stringsonline/cart/${selectedID}`
          const response = await fetch(url, options);
          const data = await response.json();
          console.log(data)
          getCart()
      }
      catch (error) {
          console.log(error)
        }
      }

    //--------- Indhold:

    return (
        <>
        <h2>Din kurv</h2>
            {cart.status === false ? <p className="noitems">Kurven er tom</p> : null}
            
            {cart.cartlines && cart.cartlines.map((item, i) => { 
            return (
                <>
            <section className="cartGrid" key={i}>
                <figure><img src={item.image_fullpath} alt={item.name}></img></figure>
                <article className="productDescription">
                    <h3>{item.name}</h3>
                        <div className="info">
                        <p>Antal:  <span>{item.quantity}</span></p>
                         <p>{(() => {
                            if (item.offerprice == "0.00") {
                            return (
                                <p className="price">DKK: {item.price * item.quantity}</p>
                            )
                            } else {
                            return (
                                <p className="price">DKK: {item.offerprice * item.quantity}</p>
                            )
                            }
                        })()}</p>
                        <button className="cartbutton" onClick={()=>{deleteProduct(item.id)}}>X</button>
                        </div>
                </article>
            </section>
            <section className="CheckoutArea">
            <p>BELØB <span>DKK</span></p><button className="cartbutton">RYD</button>
            <h4>Prisen er inkl. moms</h4>
            <Link to="/checkout"><button className="checkout">TIL KASSEN</button></Link>
        </section>
        </>
            )
        })}
        </>
    )
}

export default GetCart
