import React, { useState, useEffect } from 'react'
import './Forside.scss'
import Feature from '../Images/hero-banner.png'

function Forside() {

    //FETCH AF PRODUKTER------------//

    const [data, setData] = useState(null);

    useEffect(() => {
      if (!data) {
        fetch("https://api.mediehuset.net/rordal/pages/4")
          .then((res) => res.json())
          .then((apidata) => setData(apidata));
      }
    }, [data, setData]);
// ----------------------------//

    return (
        <>
        <div className="Forside">
<img src={Feature} alt="featured product"/>
<article>
    <h2><span>Martin</span> GPC-11E</h2>
    <h3>SERIES ELECTRO ACOUSTIC</h3>
    <h2 className="description">SE DEN NYE GENERATION HALVACOUSTISKE</h2>
    <button>LÆS MERE</button>
</article>
       </div>
       </>
    )
}

export default Forside
