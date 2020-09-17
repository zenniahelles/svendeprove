import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import './Checkout.scss'

function Checkout(props) {
//States til at skifte indholdet når formen er udfyldt
    const [completed, setCompleted] = useState(false)

// states til REACT-HOOK-FORM
    const { register, handleSubmit, errors } = useForm();
    
    const onSubmit = values => {
       
        let formData = new FormData();
//Appender værdierne fra de udfyldte felter til bodyen når man skal poste
        formData.append('firstname', values.firstname)
        formData.append('lastname', values.lastname)
        formData.append('address', values.address)
        formData.append('zipcode', values.zipcode)
        formData.append('city', values.city)
        formData.append('email', values.email)
        formData.append('phone', values.phone)
        formData.append('status', 1);

//Poster ens bestilling til APIet
        let options = {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${props.loginData.access_token}`
            }
        }
        try {
            const url = "https://api.mediehuset.net/stringsonline/orders"
            fetch(url, options)
                .then(response => response.json())
                .then(data => console.log(data))
                setCompleted(true)
        } 
        catch(error) {
            console.error(error);
        }
        
    }

    // Returner HTML
    return (
        <div> 
            <section className="Kasse">
            <h2>Kasse</h2>
            {!props.loginData.access_token ? <div><p>Du skal være logget ind for at kunne købe.</p><Link to="/login"><button>Log Ind</button></Link></div> : 
        <div>
                    {completed == false && <div>
{/* -------FORM STARTS HERE-------- */}
            <form onSubmit={handleSubmit(onSubmit)} className="FormGrid">

            <div>
{/* ---------FIRST NAME---------- */}
                <div>
                    <p>Fakturerings- & leveringsadresse</p>
                    <input type="text" name="firstname" placeholder="Fornavn"
                         ref={register({
                            required: true,
                            minLength: { message: "too short", value: 2 },
                            maxLength: { message: "too long", value: 30 },              
                          })}></input>
                          {errors.firstname && <p className="error">Skriv fornavn</p>}
                </div>
{/* ---------LAST NAME---------- */}
                <div>
                    <input type="text" name="lastname" placeholder="Efternavn"
                        ref={register({
                            required: true,
                            minLength: { message: "too short", value: 2 },
                            maxLength: { message: "too long", value: 30 },              
                          })}></input>
                          {errors.lastname && <p className="error">Skriv efternavn</p>}
                </div>
{/* ---------ADDRESS---------- */}
                <div>
                    <input type="text" name="address" placeholder="Gade/vej og husnummer"
                        ref={register({
                            required: true,
                            minLength: { message: "too short", value: 2 },
                            maxLength: { message: "too long", value: 30 },              
                          })}></input>
                          {errors.address && <p className="error">Skriv addresse</p>}
                </div>
{/* ---------ZIPCODE---------- */}
                <div>
                    <input type="text" name="zipcode" placeholder="Postnr."
                        ref={register({
                            required: true,
                            minLength: { message: "too short", value: 2 },
                            maxLength: { message: "too long", value: 30 },              
                          })}></input>
                          {errors.zipcode && <p className="error">Skriv postnummer</p>}
                </div>
{/* ---------CITY---------- */}
                <div>
                    <input type="text" name="city" placeholder="By"
                        ref={register({
                            required: true,
                            minLength: { message: "too short", value: 2 },
                            maxLength: { message: "too long", value: 30 },              
                          })}></input>
                          {errors.city && <p className="error">Skriv by</p>}
                </div>
                </div>

                <div>
                <p>Email & telefon</p>
{/* ---------EMAIL---------- */}
                <div>
                    <input type="text" name="email" placeholder="Emailadresse"
                        ref={register({
                            required: true,
                            minLength: { message: "too short", value: 2 },
                            maxLength: { message: "too long", value: 30 },              
                          })}></input>
                          {errors.email && <p className="error">Skriv email</p>}
                </div>
{/* ---------PHONE---------- */}
                <div>
                    <input type="num" name="phone" placeholder="Telefonnummer"
                        ref={register({
                            required: true,
                            minLength: { message: "too short", value: 2 },
                            maxLength: { message: "too long", value: 30 },              
                          })}></input>
                          {errors.phone && <p className="error">Skriv telefonnummer</p>}
                </div>
{/* ---------DISCLAIMER----------*/}
                <div className="disclaimer">
                    <p>Med dit telefonnumer kan vi kontakte dig 
                    i tilfælde af spørgsmål eller problemer. Hvis
                    du oplyser dit telefonnummer, kan vi også 
                    sende dig en forsendelsesbekræftigelse via SMS.</p>
                </div>
                </div>
{/* ---------SUBMIT---------- */}
                <input className="order" type="submit" value="BETAL" />
                </form>
                </div>
                }
{/* ---------IF SUBMITTED, SHOW THIS CONTENT---------- */}
                {completed == true &&
                    <div>
                        <h2>Tak for din bestilling</h2>
                        
                    </div>
                }
                </div>
            }
            </section>
        </div>
    )
}

export default Checkout