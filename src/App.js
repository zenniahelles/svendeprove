import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Forside from './components/Forside/Forside';
import Footer from './components/Footer/Footer'
import Desktop from './components/Navigation/Desktop';
import Mobile from './components/Navigation/Mobile';
import Ratings from './components/Ratings/Ratings';
import Login from './components/Login/Login';
import Checkout from './components/Cart/Checkout';
import Search from './components/Search/Search';
import Header from './components/Header/Header';
import BrandDetails from './components/Brands/BrandDetails';
import ProductListPage from './components/ProductList/ProductList';
import Buy from './components/Forside/Buy';
import GetCart from './components/Cart/GetCart';
import Terms from './components/Terms/Terms';
import OrderHistory from './components/OrderHistory/OrderHistory';
import ProductView from './components/ProductList/ProductView';
import Featured from './components/Forside/Featured';

//Styles
import './MediaQueries.scss'
import './GlobalStyles.scss'



function App() {

  //useEffect til at hente user token og sætte den som login data som kan passes som prop

  useEffect(() => {
    if(sessionStorage.getItem("token")){
      setLoginData(JSON.parse(sessionStorage.getItem("token")))
    }
  }, [])

  //states til de funktioner der skal passes 
  const [loginData, setLoginData] = useState([])
  const [brandID, setBrandID] = useState()
  const [productListID, setProductListID] = useState()
  const [productViewID, setProductViewID] = useState()

//fetch funtion 
  async function doFetch(url){
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
    catch (error) {
        console.log(error)
    }
}

  return (
    <Router>
      <section className="mobileMenu">
      <Mobile pageWrapId={"page-wrap"} outerContainerId={"App"} />
      <section id="page-wrap"></section>
      </section>
      <Header loginData={loginData}/>
      <section className="SiteGrid">
      <Desktop setBrandID={setBrandID} setProductListID={setProductListID} doFetch={doFetch}/>

{/* ----CONTENT CONTROL---- */}
<section className="Content">
      <Switch>

      <Route path="/search">
        <Search doFetch={doFetch} loginData={loginData} setProductViewID={setProductViewID} productViewID={productViewID}/>
        </Route>

      <Route path="/checkout">
        <Checkout doFetch={doFetch} loginData={loginData} setLoginData={setLoginData}/>
        </Route>

      <Route path="/login">
        <Login doFetch={doFetch} loginData={loginData} setLoginData={setLoginData}/>
        </Route>

      <Route path="/ratings">
        <Ratings doFetch={doFetch} loginData={loginData}/>
        </Route>

        <Route path="/productview">
        <ProductView doFetch={doFetch} productViewID={productViewID} loginData={loginData}/>
      </Route>

      <Route path="/productlist">
        <ProductListPage doFetch={doFetch} productListID={productListID} setProductViewID={setProductViewID} loginData={loginData}/>
      </Route>

        <Route path="/brand">
        <BrandDetails doFetch={doFetch} brandID={brandID} loginData={loginData} setProductViewID={setProductViewID}/>
        </Route>

        <Route path="/cart">
        <Buy doFetch={doFetch} loginData={loginData} setLoginData={setLoginData} setProductViewID={setProductViewID} productViewID={productViewID}/>
        </Route>      
        
        <Route path="/getcart">
        <GetCart doFetch={doFetch} loginData={loginData} setLoginData={setLoginData}/>
      </Route>

        <Route path="/terms">
          <Terms/>
        </Route>

        <Route path="/history">
      <OrderHistory doFetch={doFetch} loginData={loginData} />
        </Route>

        <Route path="/featured">
        <Featured doFetch={doFetch}/>
        </Route>

        <Route path="/">
        <Forside doFetch={doFetch} loginData={loginData} setProductViewID={setProductViewID} productViewID={productViewID}/>
      </Route>



      </Switch>
</section>
</section>
{/* ----CONTENT CONTROL END---- */}
      <Footer/>
    </Router>
  );
}

export default App;
