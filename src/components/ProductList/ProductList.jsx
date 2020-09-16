import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProductListPage(props) {

    const [productList, setProductList ] = useState()

    async function fetchProducts(id){
        const url = `https://api.mediehuset.net/stringsonline/productgroups/${id}`
        let data = await props.doFetch(url)
        setProductList(data.group.products)
    }
    useEffect(() => {
        if (props.productListID !== 0) {
        fetchProducts(props.productListID)
        }
    },[props.productListID])
    console.log(productList)
    return (
      <div>
        
          <div className="ProductList">
        {productList && productList.map((item, index) => {
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
         
      </div>
    );
  }