import React, { useState, useEffect } from 'react';
import './Navigation.scss';
import { Link } from 'react-router-dom'

function Desktop(props) {

  async function doFetch(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
//fetch products list------------------------------------//
  const [productgroups, setProductgroups] = useState([]);

  async function fetchProductgroups() {
    const url = `https://api.mediehuset.net/stringsonline/`;
    let data = await doFetch(url);
    setProductgroups(data.productgroups);
  }

  useEffect(() => {
    fetchProductgroups();
  }, []);

  // fetch brands list----------------------------------//
  const [brands, setBrands] = useState([]);

  async function fetchBrands() {
    const url = `https://api.mediehuset.net/stringsonline/brands`;
    let data = await doFetch(url);
    setBrands(data);
  }

  useEffect(() => {
    fetchBrands();
  }, []);

// return -----------------------------------------//
  return (
    <nav className='SideMenu'>
        {productgroups.items
          ? productgroups.items.map((item, i) => (
              <div key={i} className='mainlink'>
                <span>{item.title}</span>
                <span>
                  {item.subgroups.map((item, i) => (
                    <div key={i} className='submenu'>
                      <span className='sublink'>{item.title}</span>
                    </div>
                  ))}
                </span>
              </div>
            ))
          : null}
          
        <div className='mainlink'>
          <span>Brands</span>
          {brands.items
            ? brands.items.map((item, i) => (
                <div key={i} className='submenu'>
                  <Link><span id={item.id} onClick={(e)=>{props.setBrandID(e.target.id)}} className='sublink'>{item.title}</span></Link>
                </div>
              ))
            : null}
        </div>
    </nav>
  );
}

export default Desktop;

