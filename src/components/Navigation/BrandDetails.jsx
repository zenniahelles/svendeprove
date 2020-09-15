import React, { useState, useEffect } from 'react';
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
        {brand ? (
          <div className="Brand">
          <img src={brand.item.image_fullpath}/>
            <h4>{brand.item.title}</h4>
            <p>{brand.item.description}</p> 
          </div>
        ) : (
          <div>Loading..</div>
        )}
      </div>
    );
  }