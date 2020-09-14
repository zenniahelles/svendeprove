import React, { useState, useEffect } from 'react';
import './MultiFetch.scss'

function MultiFetch(props) {

//Sætter variabler
    const [countries, setCountries] = useState([])
    const [countryId, setCountryId ] = useState(0)
    const [cities, setCities ] = useState([])
    const [hotels, setHotels] = useState ([])
    const [cityId, setCityId] = useState(0)

//Fetcher hvert niveau
    async function fetchCountries(){
        const url = `https://api.mediehuset.net/overlook/countries`
        let data = await props.doFetch(url)
        setCountries(data)
    }

    async function fetchCities(id){
        const url = `https://api.mediehuset.net/overlook/cities/by_country/${id}`
        let data = await props.doFetch(url)
        setCities(data)
    }

    async function fetchHotels(id){
        const url = `https://api.mediehuset.net/overlook/hotels/by_city/${id}`
        let data = await props.doFetch(url)
        setHotels(data)
    }

    useEffect(() => {
        fetchCountries()
    }, [])

    useEffect(() => {
        if (!countryId == 0) {
        fetchCities(countryId)
        }
    },[countryId])

    useEffect(() => {
        if (!cityId == 0) {
        fetchHotels(cityId)
        }
    },[cityId])

    console.log(hotels)

    return(
        <div className="Breadcrumbs">
            <h2>Lande</h2>

            {!cities.items && countries && countries.items && countries.items.map((item, index) => {
                return(
                <div key={index}>
                    <h3>{item.name}</h3>
                <img id={item.id} onClick={(e) => {setCountryId(e.target.id)}} src={item.image} alt="country"></img>
                </div>
                )
            })}

            {!hotels.items && cities.items && cities.items.map((item, index) => {
                return(
                    <div key={index}>
                        <h3>{item.name}</h3>
                        <img id={item.id} onClick={(e) => {setCityId(e.target.id)}} src={item.image} alt="city"></img>
                    </div>
                )
            })}

            {hotels.items && hotels.items.map((item, index) => {
                return(
                    <div key={index}>
                        <h3>{item.title}</h3>
                        <img id={item.id} onClick={(e) => {console.log(e.target.id)}} src={item.image} alt="city"></img>
                    </div>
                )
            })}
        </div>
    )
}

export default MultiFetch;