import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Forside from './components/Forside/Forside';
import Footer from './components/Footer/Footer'
import Desktop from './components/Navigation/Desktop';
import Mobile from './components/Navigation/Mobile';
import MultiFetch from './components/MultiFetch/MultiFetch';
import Ratings from './components/Ratings/Ratings';
import Login from './components/Login/Login';
import PostForm from './components/PostForm/PostForm';
import Search from './components/Search/Search';
import Header from './components/Header/Header';
import BrandDetails from './components/Navigation/BrandDetails';
//Styles
import './MediaQueries.scss'
import './GlobalStyles.scss'



function App() {
  useEffect(() => {
    if(sessionStorage.getItem("token")){
      setLoginData(JSON.parse(sessionStorage.getItem("token")))
    }
  }, [])

  const [loginData, setLoginData] = useState([])
  const [brandID, setBrandID] = useState()

  console.log(loginData)

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
      <div className="mobileMenu">
      <Mobile pageWrapId={"page-wrap"} outerContainerId={"App"} />
      <div id="page-wrap"></div>
      </div>
      <Header/>
      <div className="SiteGrid">
      <Desktop setBrandID={setBrandID}/>

{/* ----CONTENT CONTROL---- */}
<div className="Content">
      <Switch>

      <Route path="/search">
        <Search doFetch={doFetch} loginData={loginData} setLoginData={setLoginData}/>
        </Route>

      <Route path="/postform">
        <PostForm doFetch={doFetch} loginData={loginData} setLoginData={setLoginData}/>
        </Route>

      <Route path="/login">
        <Login doFetch={doFetch} loginData={loginData} setLoginData={setLoginData}/>
        </Route>

      <Route path="/ratings">
        <Ratings doFetch={doFetch} loginData={loginData}/>
        </Route>

      <Route path="/multifetch">
        <MultiFetch doFetch={doFetch}/>
        </Route>

        <Route path="/brand">
        <BrandDetails doFetch={doFetch} brandID={brandID}/>
        </Route>


        <Route path="/">
        <Forside doFetch={doFetch}/>
      </Route>

      </Switch>
</div>
</div>
{/* ----CONTENT CONTROL END---- */}
      <Footer/>
    </Router>
  );
}

export default App;
