import React, { useState, useEffect } from 'react';
import './Forside.scss'
import { Link } from 'react-router-dom'

function Buy(props) {

    // states til at gemme ID og data fra api
    const [items, setItems] = useState([]);
    const [buyData, setBuyData] = useState([]);

    async function toCart() {
        //console.log(items);

        let formData = new FormData();
        formData.append('quantity', items.quantity)
        formData.append('product_id', items.product_id)
        formData.append('product_name', items.product_name)
        formData.append('price', items.price)

        let options = {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${props.loginData.access_token}`
            }
        }        
        try {
            const url = `https://api.mediehuset.net/stringsonline/cart`
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
        }
        catch (error) {
            console.log(error)
        }
    }

    // Funktion til at fetche produkter
    async function fetchProducts(){
        const url = `https://api.mediehuset.net/stringsonline/productgroups/2`
        let data = await props.doFetch(url);
        setBuyData(data.group.products)
    }

    // UseEffect med et tomt dependency array (kører kun en gang når component mounter)
    useEffect(() => {
        fetchProducts()
    }, [])

// Returner HTML
return (
    <section className="Products">
        <h3><span>Kundernes</span> favoritter</h3>
            <section>
            {buyData && buyData.slice(0,4).map((item, index) => {
                return (
                    <div className="productGrid" key={index}>

                        <figure><img src={item.image_fullpath} alt='product'/></figure>
                        
                        <article className="productDescription">
                        <h4>{item.name}</h4>
                        <p>{item.description_short} <Link to="productview"><span id={item.id} onClick={(e)=>{props.setProductViewID(e.target.id)}}>Læs mere</span></Link></p>
                        {(() => {
                                if (item.offerprice == "0.00") {
                                return (
                                    <p className="price">Pris: DKK {item.price}</p>
                                )
                                } else {
                                return (
                                    <p className="price">Pris: DKK {item.offerprice}</p>
                                )
                                }
                            })()}
{!props.loginData.access_token ? <p>Du skal være logget ind for at kunne købe.</p> : 
                        <>
                        <form key={item.id}>
                        <input type="hidden" name="product_id" value={item.id} />
                        <input type="hidden" name="product_name" value={item.title} />
                        <input type="hidden" name="price" value={item.price} />
                        <label htmlFor="quantity">Vælg antal: </label>
                        <input type="number" name="quantity"
                            onChange={(e) => setItems({
                                product_id: item.id,
                                price: item.price,
                                name: item.title,
                                id: item.id,
                                quantity: e.target.value
                            })} />
                        
                        <button type="button" onClick={() => toCart()}>Læg i kurv</button></form></>
                        }
                        <span>{item.stock} på lager</span>
                        </article>
                </div>
                )
            })}
        </section>
    </section>
    )
}

export default Buy