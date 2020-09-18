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
//Fetcher produkter en gang når siden mounter
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
        {productgroups.items ? productgroups.items.map((item, i) => (
              <section key={i} className='mainlink mainlink1'>
                <span>{item.title}</span>
                <span className="Submenu">
                  {item.subgroups.map((item, i) => (
                    <div key={i} className='sublinks'>
                      <Link to="/productlist"><span id={item.id} onClick={(e)=>{props.setProductListID(e.target.id)}} className='sublink'>{item.title}</span></Link>
                    </div>
                  ))}
                </span>
              </section>
            ))
          : null}
          
        <section className='mainlink mainlink2'>
          <span>Brands</span>
          <span className="Brandmenu">
          {brands.items
            ? brands.items.map((item, i) => (
                <div key={i} className='sublinks'>
                   <Link to="/brand"><span id={item.id} onClick={(e)=>{props.setBrandID(e.target.id)}} className='sublink brandlink'>{item.title}</span></Link>
                </div>
              ))
            : null}</span>
        </section>
    </nav>
  );
}

export default Desktop;

