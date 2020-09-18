import React from 'react'
import './Forside.scss'
import Feature from '../Images/hero-banner.png'
import { Link } from 'react-router-dom'
import Buy from './Buy.jsx'


function Forside(props) {

return (
<section className="Forside">

<section className="Hero">
    <img src={Feature} alt="featured product"/>
    <article>
      <h2><span>Martin</span> GPC-11E</h2>
      <h3>SERIES ELECTRO ACOUSTIC</h3>
      <h2 className="description">SE DEN NYE GENERATION HALVACOUSTISKE</h2>
      <Link to="/featured"><button>LÆS MERE</button></Link>
    </article>
</section>
<Buy doFetch={props.doFetch} loginData={props.loginData} setProductViewID={props.setProductViewID} productViewID={props.productViewID}/>

</section>
    )
}

export default Forside
