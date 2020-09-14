import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa'
import './Search.scss'

export default function Search(props) {
    // Funktion til at sortere med
function sortByKey(array, key, dest) {
    let sorted_array;
    let new_array = [...array];

    switch(key) {
        default:
        case "id":
            sorted_array = new_array.sort((low, high) => low.id - high.id);
            break;
        case "zipcode":
            sorted_array = new_array.sort((low, high) => low.zipcode - high.zipcode);
            break;
        case "firstname":
            sorted_array = new_array.sort(function(a, b) {
                var x = a[key].toLowerCase(); var y = b[key].toLowerCase();
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            break;
    }
    if(dest === 'desc') {
        sorted_array.reverse();
    }
    return sorted_array;
}

async function getParticipants(token) {
    let headers = {
        'Authorization': `Bearer ${token}`
    };
    try {
        const url = `https://api.mediehuset.net/rordal/registrations`
        const response = await fetch(url, headers);
        let data = await response.json();
        setAllParticipants(data)
        return sortByKey(data.items, 'id');
    } catch (error) {
        console.log(error);
    }
}

    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState('');

    // get participants
    const [participants, setParticipants] = useState(true)
    const [allPartcipants, setAllParticipants] = useState([])
    const [searchParticipants, setSearchParticipants] = useState([])
    
    useEffect(() => {
    }, [participants])

    useEffect(() => {
        getParticipants(props.loginData && props.loginData.access_token).then((data) => {
            setParticipants(data);
            setIsLoading(false);
        })
    }, [props.loginData && props.loginData.access_token]);

    // search function
    async function getSearchResult() {
        let headers = {
            'Authorization': `Bearer ${props.loginData && props.loginData.access_token}`
        }
        try {
            const url = `https://api.mediehuset.net/rordal/search/${query}`
            const response = await fetch(url, headers)
            const data = await response.json()
            setAllParticipants(data)
            setParticipants(data.items)
            setIsLoading(false)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function getSortResult(e, list) {
        let sortVal = e.target.value.split('_');
        setParticipants(sortByKey(list, sortVal[0], sortVal[1]));
    }   

    return (
        <div>
            <section className="Deltagerliste">
                <span><Link to="/">FORSIDE</Link> <FaAngleRight /> DELTAGERLISTE</span>
                <h2>Search</h2>
                <div className="SearchArea">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Søg blandt deltagere" 
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus />
                    <button onClick={() => { getSearchResult()}}>SØG</button>

                    <select name="sort" onChange={(e) => getSortResult(e, participants)}>
                        <option value="firstname_asc">Alfabetisk (A-Z)</option>
                        <option value="firstname_desc">Alfabetisk (Z-A)</option>
                        <option value="zipcode_asc">Postnummer (Stigende)</option>
                        <option value="zipcode_desc">Postnummer (Faldende)</option>
                    </select>

                    {participants && console.log( "Count:", allPartcipants.count)}
                    {searchParticipants && console.log("Count Search:", searchParticipants.num_items)}
                        
                    {allPartcipants.count && <span>Fandt <b>{allPartcipants.count} </b> resultater</span>}                                
                    {allPartcipants.num_items && <span>Fandt <b>{allPartcipants.num_items} </b> resultater</span>}                

                </div>

                {isLoading ? 
                    (
                        <h2>Henter deltagere</h2>
                    ) : (
                        <div>
                <div className="ResultsGrid ResultTitles">
                <span>Start nr.:</span>
                <span>Navn:</span>
                <span>By:</span>
                <span>Løb:</span>
                <span>Postnr.:</span>
                </div>

                
                            {participants && participants.map((item, i) => {
                                return (
                                    <div className="ResultsGrid" key={i}>
                                    <p>{item.id}</p>
                                    <p>{item.firstname} {item.lastname}</p>
                                    <p>{item.city}</p>
                                    <div>
                                    <p>{item.run_id == 1 && "10 km"}</p>
                                    <p>{item.run_id == 2 && "5 km"}</p>
                                    <p>{item.run_id == 3 && "One Mile"}</p>
                                    </div>
                                    <p>{item.zipcode}</p>
                                    </div>
                                
                                )
                            })}
                            
                        </div>
                    )
                }
            </section>
        </div>
    )
}