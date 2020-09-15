import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

export default function BrandsList(props) {

    const [apiData, setApiData] = useState(null);
    
    async function getBrandsList() {
        const fetchHeaders = new Headers();
        fetchHeaders.append('Accept', 'application/json');
        try {
            const request = await fetch('https://api.mediehuset.net/stringsonline/brands', { headers: fetchHeaders });
            const response = await request.json();
            setApiData(response.items);
        } catch (error) {
            console.log('getBrandsList -> Error', error);
        }
    }
    useEffect(() => {
        getBrandsList()
    }, [])

    return (
        <>
                {
                    apiData && apiData && apiData.map((item, i) =>
                        <span key={"brand-" + item.id}>
                        <Link id={item.id} onClick={(e)=>{props.setBrandID(e.target.id)}}><span>{item.title}</span></Link>
                        </span>
                    )
                }
        </>
    )
}