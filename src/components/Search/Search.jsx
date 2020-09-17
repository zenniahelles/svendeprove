import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Search.scss'
import '../../GlobalStyles.scss'

export default function Search(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState('');

    const [products, setProducts] = useState(true)
    const [allProducts, setAllProducts] = useState([])
    const [searchProducts, setSearchProducts] = useState([])
    const [items, setItems] = useState([]);

// Funktion til at lægge ting i kurv 
    async function toCart() {
        let formData = new FormData();
        formData.append('quantity', items.quantity)
        formData.append('product_id', items.product_id)
        formData.append('product_name', items.product_name)
        formData.append('price', items.price)

        let options = {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${props.loginData.access_token}`
            }
        }        
        try {
            const url = `https://api.mediehuset.net/stringsonline/cart`
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
        }
        catch (error) {
            console.log(error)
        }
    }

//fetcher produkter der skal søges i

async function getSearchProducts(token) {
    let headers = {
        'Authorization': `Bearer ${token}`
    };
    try {
        const url = `https://api.mediehuset.net/stringsonline/`
        const response = await fetch(url, headers);
        let data = await response.json();
        setAllProducts(data)
    } catch (error) {
        console.log(error);
    }
}

    useEffect(() => {
    }, [products])

    useEffect(() => {
        getSearchProducts(props.loginData && props.loginData.access_token).then((data) => {
            setProducts(data);
            setIsLoading(false);
        })
    }, [props.loginData && props.loginData.access_token]);


// search function
    async function getSearchResult() {
        let headers = {
            'Authorization': `Bearer ${props.loginData && props.loginData.access_token}`
        }
        try {
            const url = `https://api.mediehuset.net/stringsonline/search/${query}`
            const response = await fetch(url, headers)
            const data = await response.json()
            setAllProducts(data)
            setProducts(data.items)
            setIsLoading(false)
        }
        catch (error) {
            console.log(error)
        }
    }

//returnerer ud på siden

    return (
        <div>
            <section className="SearchPage">
                <h2><span>Søg</span> efter produkter</h2>
                <div className="SearchArea">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Søg efter produkt" 
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus />
                    <button onClick={() => { getSearchResult()}}>SØG</button>

                    {products && console.log( "Count:", allProducts.count)}
                    {searchProducts && console.log("Count Search:", searchProducts.num_items)}
                        
                    {allProducts.count && <span>Fandt <b>{allProducts.count} </b> resultater</span>}                                
                    {allProducts.num_items && <span>Fandt <b>{allProducts.num_items} </b> resultater</span>}                

                </div>

                {isLoading ? 
                    (
                        <h2>Henter produkter</h2>
                    ) : (
                        <div>

                            {products && products.map((item, i) => {
                                return (
                                    <div className="Products">
                                    <div className="productGrid" key={i}>
                                    <figure><img src={item.image_fullpath} alt='product'/>
                                    </figure>
            
            <article className="productDescription">
            <h4>{item.name}</h4>
            <p>{item.description_short} <Link>Læs mere</Link></p>
            {(() => {
                                if (item.offerprice == "0.00") {
                                return (
                                    <p className="price">Pris: DKK {item.price}</p>
                                )
                                } else {
                                return (
                                    <p className="price">Pris: DKK {item.offerprice}</p>
                                )
                                }
                            })()}

                        <form key={item.id}>
                        <input type="hidden" name="product_id" value={item.id} />
                        <input type="hidden" name="product_name" value={item.title} />
                        <input type="hidden" name="price" value={item.price} />
                        <label htmlFor="quantity">Vælg antal: </label>
                        <input type="number" name="quantity"
                            onChange={(e) => setItems({
                                product_id: item.id,
                                price: item.price,
                                name: item.title,
                                id: item.id,
                                quantity: e.target.value
                            })} />
                        <button type="button" onClick={() => toCart()}>Læg i kurv</button>
                        </form>

            </article>
                                    </div></div>
                                
                                )
                            })}
                            
                        </div>
                    )
                }
            </section>
        </div>
    )
}