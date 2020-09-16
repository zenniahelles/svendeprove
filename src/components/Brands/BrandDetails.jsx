import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BrandDetails.scss'

export default function BrandDetails(props) {
    const [brand, setBrand ] = useState()
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
                  <button>Læg i kurv</button>
                    <br/><br/>      
              </article>
        </div>
            )
    })}   
            
          </div>
         }
      </div>
    );
  }