import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../ProductList/ProductView.scss'
import '../../GlobalStyles.scss'

export default function Featured(props) {

    const [product, setProduct ] = useState()
    const [items, setItems] = useState([]);
    
     //funktion til at lægge ting i kurv

     async function toCart() {
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

    //funktion til at fetche brands ud fra ID
    async function fetchProduct(id){
        const url = `https://api.mediehuset.net/stringsonline/products/11`
        let data = await props.doFetch(url)
        setProduct(data)
        
    }
    useEffect(() => {
        if (props.productViewID !== 0) {
        fetchProduct(props.productViewID)
        }
    },[props.productViewID])
    console.log(product)

    // returnerer ud på siden 
    return (
      <div>
           {/* {product && product.item.gallery && product.item.gallery.map((item, index) =>
		<div key={index}>
            <figure><img src={item.fullpath} /></figure>
		</div>
	            )
            } */}

        {product && 
          <div className="ProductView">

            <section className="ProductGrid">

            <article>
            <img src={product.item.image.fullpath} alt="product"/>
            <h3>{product.item.name}</h3>
            <p>{product.item.description_long}</p>
            </article>

            <article className="griditem2">
            <img src={product.item.brand_image} alt="product"/>
            {(() => {
                  if (product.item.offerprice == "0.00") {
                  return (
                      <p className="price">Pris: DKK {product.item.price}</p>
                  )
                  } else {
                  return (
                      <p className="price">Pris: DKK {product.item.offerprice}</p>
                  )
                  }
                })()}

                <form key={product.item.id}>
                        <input type="hidden" name="product_id" value={product.item.id} />
                        <input type="hidden" name="product_name" value={product.item.title} />
                        <input type="hidden" name="price" value={product.item.price} />
                        <label htmlFor="quantity">Vælg antal: </label>
                        <input type="number" name="quantity"
                            onChange={(e) => setItems({
                                product_id: product.item.id,
                                price: product.item.price,
                                name: product.item.title,
                                id: product.item.id,
                                quantity: e.target.value
                            })} />
                        <button type="button" onClick={() => toCart()}>Læg i kurv</button>
                    </form>
                    <p>{product.item.stock} på lager</p>
                    <p>Bedømmelse: {product.item.rating}/5</p>
            </article>

            </section>
            
          </div>
         }
      </div>
    );
  }