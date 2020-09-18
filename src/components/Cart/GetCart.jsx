import React, { useEffect, useState } from 'react'
import './GetCart.scss'
import { Link } from 'react-router-dom';

function GetCart(props) {

    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

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

//useeffect til at hente cart indhold når siden mounter, men kun hvis man er logget ind
    useEffect(() => {
      getCart()
    }, [])
    
    useEffect(() => {
        if (props.loginData.access_token) {
            getCart()
        }
    }, [props.loginData])

    // useEffect til at udregne totalprisen ud fra cartlines

    useEffect(() => {
        if (cart.cartlines){
            calculateTotal()
            }
        }, [cart,getCart])

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

      //------Ryd hele kurven:

      const emptyCart = async () => {
  
        let options = {
          method: "DELETE",
          headers: {
              'Authorization': `Bearer ${props.loginData.access_token}`
          }
      }
      try {
          const url = `https://api.mediehuset.net/stringsonline/cart`
          const response = await fetch(url, options);
          const data = await response.json();
          console.log(data)
          getCart()
      }
      catch (error) {
          console.log(error)
        }
      }

      //--------------------- Læg priser sammen:

      const calculateTotal = () => {
        let lines = cart && cart.cartlines
        let total = 0;
        for(let i=0; i<lines.length; i++){
            total += parseInt(lines[i].price) * lines[i].quantity;
        }
        setTotalPrice(total)
      }

    //--------- Indhold:

return (
    <section className="Cart">
        <h2>Din kurv</h2>

        {!props.loginData.access_token ? <p style={{color: "white"}}>Du skal være logget ind for at kunne købe.</p> : 

        <>
        {cart.status === false ? <p className="noitems">Kurven er tom</p> : null}
            
        {cart.cartlines && cart.cartlines.map((item, i) => { 
            return (
            <>
            <section className="cartGrid" key={i}>
                <figure><img src={item.image_fullpath} alt={item.name}></img></figure>
                <h4>{item.name}</h4>

                <article className="productDescription">
                    <article className="info">
                        <p>Antal:  <span>{item.quantity}</span></p>
                         <p>{(() => {
                            if (item.offerprice == "0.00") {
                            return (
                                <p className="price">DKK: {item.price * item.quantity},00</p>
                            )
                            } else {
                            return (
                                <p className="price">DKK: {item.offerprice * item.quantity},00</p>
                            )
                            }
                        })()}</p>
                        <button className="cartbutton" onClick={()=>{deleteProduct(item.id)}}>X</button>
                    </article>
                </article>
            </section>
        </>
            )
        })}
        {cart.status === false ? <span></span> : 
        
        <section className="CheckoutArea">
            <p>BELØB <span className="totalamount">DKK {totalPrice},00</span></p><button className="cartbutton" onClick={()=>{emptyCart()}}>RYD</button>
            <h4>Prisen er inkl. moms</h4>
            <Link to="/checkout"><button className="checkout">TIL KASSEN</button></Link>
        </section>}
        </>
                    }
        </section>
    )
}

export default GetCart
