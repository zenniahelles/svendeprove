import React, { useState, useEffect } from 'react'
import './Forside.scss'
import Feature from '../Images/hero-banner.png'
import { Link } from 'react-router-dom'

function Forside(props) {

    //FETCH AF PRODUKTER------------//
 const [products, setProducts] = useState([]);

 async function fetchProducts() {
   const url = `https://api.mediehuset.net/stringsonline/productgroups/2`;
   let data = await props.doFetch(url);
   setProducts(data.group.products);
 }

 useEffect(() => {
   fetchProducts();
 }, []);
// ----------------------------//

    return (
<>
<div className="Forside">

<section className="Hero">
    <img src={Feature} alt="featured product"/>
    <article>
      <h2><span>Martin</span> GPC-11E</h2>
      <h3>SERIES ELECTRO ACOUSTIC</h3>
      <h2 className="description">SE DEN NYE GENERATION HALVACOUSTISKE</h2>
      <button>LÆS MERE</button>
    </article>
</section>

<section className="Products">
  <h3><span>Kundernes</span> favoritter</h3>
  <section >
    {products && products.slice(0,4).map((item, index) => {
      return(
        <div className="productGrid" key={index}>
          
          <figure><img src={item.image_fullpath} alt='product'/></figure>
            
          <article className="productDescription">
            <h4>{item.name}</h4>
            <p>{item.description_short}</p>
            <Link>Læs mere</Link>
            {(() => {
                                if (item.offerprice == "0.00") {
                                return (
                                    <p>Pris: DKK {item.price}</p>
                                )
                                } else {
                                return (
                                    <p>Pris: DKK {item.offerprice}</p>
                                )
                                }
                            })()}
                            <button>Læg i kurv</button>
                            <br/><br/>
                            
          </article>
        </div>
            )
    })}    
    </section>    
</section>

</div>
</>
    )
}

export default Forside
