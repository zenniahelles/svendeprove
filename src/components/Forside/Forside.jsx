import React, { useState, useEffect } from 'react'
import './Forside.scss'
import Feature from '../Images/hero-banner.png'
import { Link } from 'react-router-dom'
import Buy from './Buy.jsx'


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

<Buy doFetch={props.doFetch} loginData={props.loginData}/>

</div>
</>
    )
}

export default Forside
