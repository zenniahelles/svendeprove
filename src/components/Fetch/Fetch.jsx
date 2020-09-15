import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

export default function Brands(props) {

    const [apiData, setApiData] = useState(null);
    
    async function getBrands() {
        const fetchHeaders = new Headers();
        fetchHeaders.append('Accept', 'application/json');
        try {
            const request = await fetch('https://api.mediehuset.net/stringsonline/brands', { headers: fetchHeaders });
            const response = await request.json();
            setApiData(response.items);
        } catch (error) {
            console.log('getBrands -> Error', error);
        }
    }
    useEffect(() => {
        getBrands()
    }, [])

    return (
        <div>
                {
                    apiData && apiData && apiData.map((item, i) =>
                        <span key={item.id}>
                        <Link to="/"><span>{item.title}</span></Link>
                            <br />
                        </span>
                    )
                }
        </div>
    )
}
// import React, { useState, useEffect } from 'react'
// import './Fetch.scss'

// function Brands(props) {
//     const [countries, setCountries] = useState([])

// //Fetcher hvert niveau
//     async function fetchCountries(){
//         const url = `https://api.mediehuset.net/overlook/countries`
//         let data = await props.doFetch(url)
//         setCountries(data)
//     }

//     useEffect(() => {
//         fetchCountries()
//     }, [])

//     return (
//         <section className="Fetch">

// { countries.items && countries.items.map((item, index) => {
//                 return(
//                 <div key={index}>
//                     <h3>{item.name}</h3>
//                 </div>
//                 )
//             })}
//         </section>
//     )
// }

// export default Brands
