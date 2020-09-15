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
                  <Link id={item.id} onClick={(e)=>{props.setBrandID(e.target.id)}}><span className='sublink'>{item.title}</span></Link>
                </div>
              ))
            : null}
        </div>
    </nav>
  );
}

export default Desktop;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navigation.scss'
// import BrandsList from './BrandsList.jsx';

// class Desktop extends React.Component {

//     state = { showing: false };

//     render() {
//         const { showGuitar } = this.state;
//         const { showBrands } = this.state;
//         const { showBass } = this.state;
//         const { showOther } = this.state;
//         const { showKeyboard } = this.state;

//         return (
//             <div className="SideMenu">
//                 <ul className="mainlink" onClick={() => this.setState({ showGuitar: !showGuitar })}>Guitarer</ul>
//                 <Link to="/"><li className="sublink" style={{ display: (showGuitar ? 'block' : 'none') }}>Elguitarer</li></Link>
//                 <Link to="/"><li className="sublink" style={{ display: (showGuitar ? 'block' : 'none') }}>Westernguitarer</li></Link>
                
//                 <ul className="mainlink" onClick={() => this.setState({ showBass: !showBass })}>Basser</ul>
//                 <Link to="/"><li className="sublink" style={{ display: (showBass ? 'block' : 'none') }}>Elbasser</li></Link>
//                 <Link to="/"><li className="sublink" style={{ display: (showBass ? 'block' : 'none') }}>Akustiske basser</li></Link>
                
//                 <ul className="mainlink" onClick={() => this.setState({ showOther: !showOther })}>Andre Strengeinstrumenter</ul>
//                 <Link to="/"><li className="sublink" style={{ display: (showOther ? 'block' : 'none') }}>Banjo</li></Link>
//                 <Link to="/"><li className="sublink" style={{ display: (showOther ? 'block' : 'none') }}>Mandolin</li></Link>
//                 <Link to="/"><li className="sublink" style={{ display: (showOther ? 'block' : 'none') }}>Ukulele</li></Link>
                
//                 <ul className="mainlink" onClick={() => this.setState({ showKeyboard: !showKeyboard })}>Keyboards</ul>
//                 <Link to="/"><li className="sublink" style={{ display: (showKeyboard ? 'block' : 'none') }}>Digitalklaverer</li></Link>
//                 <Link to="/"><li className="sublink" style={{ display: (showKeyboard ? 'block' : 'none') }}>USB & MIDI-keyboards</li></Link>
//                 <Link to="/"><li className="sublink" style={{ display: (showKeyboard ? 'block' : 'none') }}>Synthesizere</li></Link>
//                 <Link to="/"><li className="sublink" style={{ display: (showKeyboard ? 'block' : 'none') }}>Groovebokse og samplere</li></Link>

//                 <ul className="mainlink" onClick={() => this.setState({ showBrands: !showBrands })}>Brands</ul>
//                 <div className="sublink" style={{ display: (showBrands ? 'block' : 'none') }}><BrandsList setBrandID={this.props.setBrandID}/></div>
//             </div>  
//         )
//     }
// }

// export default Desktop
