import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BrandDetails.scss'
import '../../GlobalStyles.scss'

export default function BrandDetails(props) {

    const [brand, setBrand ] = useState()
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
    async function fetchBrand(id){
        const url = `https://api.mediehuset.net/stringsonline/brands/${id}`
        let data = await props.doFetch(url)
        setBrand(data)
    }
    useEffect(() => {
        if (props.brandID !== 0) {
        fetchBrand(props.brandID)
        }
    },[props.brandID])
    console.log(brand)

    // returnerer ud på siden 
    return (
      <div>
        {brand && 
          <div className="Brand">
            <div className="brandBox">

          <img className="brandimg" src={brand.item.image_fullpath}/>

            <article>
              <h4>{brand.item.title}</h4>
            <p>{brand.item.description}</p>
            </article>

            </div>

            <h2>{brand.item.title} produkter</h2>
            
        {brand.item.products && brand.item.products.map((item, index) => {
          return(
            <section className="Products">
            <div className="productGrid" key={index}>
          
              <figure><img src={item.image_fullpath} alt='product'/></figure>
            
              <article className="productDescription">
                <h4>{item.name}</h4>
                <p>{item.description_short} <Link>Læs mere</Link></p>
                
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
                        <button type="button" onClick={() => toCart()}>Læg i kurv</button>
                        </form>
 
              </article>
        </div>
        </section>
            )
    })}   
            
          </div>
         }
      </div>
    );
  }