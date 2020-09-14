import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import './PostForm.scss'

//Timestamp converter
function date2unix(date) {
    let stamp = new Date(date);
    return stamp.getTime() / 1000;
}

function PostForm(props) {
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
        formData.append('birthdate', date2unix(values.birthdate))
        formData.append('gender', values.gender)
        formData.append('run_id', values.run_id)
        formData.append('comment', values.comment)
//Poster til APIet
        let options = {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${props.loginData.access_token}`
            }
        }
        try {
            const url = "https://api.mediehuset.net/rordal/registrations"
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
            <section className="Tilmelding">

            {!props.loginData.access_token ? <div><p>Du skal være logget ind for at kunne tilmelde dig.</p><Link to="/login"><button>Log Ind</button></Link></div> : 
        <div>
                    {completed == false && <div>
{/* -------FORM STARTS HERE-------- */}
            <form onSubmit={handleSubmit(onSubmit)} className="FormGrid">
{/* ---------RUN---------- */}
                <div>
                    <label htmlFor="run_id">Løb:</label>
                    <select name="run_id" 
                        ref={register({
                            required: true,              
                          })}>
                        <option value="">Vælg løb</option>
                        <option value="1">One Mile</option>
                        <option value="2">5 km</option>
                        <option value="3">10 km</option>
                    </select>
                    {errors.run_id && <p className="error">Vælg et løb</p>}
                </div>
{/* ---------FIRST NAME---------- */}
                <div>
                    <label htmlFor="firstname">Fornavn:</label>
                    <input type="text" name="firstname" 
                         ref={register({
                            required: true,
                            minLength: { message: "too short", value: 2 },
                            maxLength: { message: "too long", value: 30 },              
                          })}></input>
                          {errors.firstname && <p className="error">Skriv fornavn</p>}
                </div>
{/* ---------LAST NAME---------- */}
                <div>
                    <label htmlFor="lastname">Efternavn:</label>
                    <input type="text" name="lastname" 
                        ref={register({
                            required: true,
                            minLength: { message: "too short", value: 2 },
                            maxLength: { message: "too long", value: 30 },              
                          })}></input>
                          {errors.lastname && <p className="error">Skriv efternavn</p>}
                </div>
{/* ---------ADDRESS---------- */}
                <div>
                    <label htmlFor="address">Adresse:</label>
                    <input type="text" name="address" 
                        ref={register({
                            required: true,
                            minLength: { message: "too short", value: 2 },
                            maxLength: { message: "too long", value: 30 },              
                          })}></input>
                          {errors.address && <p className="error">Skriv addresse</p>}
                </div>
{/* ---------ZIPCODE---------- */}
                <div>
                    <label htmlFor="zipcode">Postnummer:</label>
                    <input type="text" name="zipcode" 
                        ref={register({
                            required: true,
                            minLength: { message: "too short", value: 2 },
                            maxLength: { message: "too long", value: 30 },              
                          })}></input>
                          {errors.zipcode && <p className="error">Skriv postnummer</p>}
                </div>
{/* ---------CITY---------- */}
                <div>
                    <label htmlFor="city">By:</label>
                    <input type="text" name="city" 
                        ref={register({
                            required: true,
                            minLength: { message: "too short", value: 2 },
                            maxLength: { message: "too long", value: 30 },              
                          })}></input>
                          {errors.city && <p className="error">Skriv by</p>}
                </div>
{/* ---------EMAIL---------- */}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" 
                        ref={register({
                            required: true,
                            minLength: { message: "too short", value: 2 },
                            maxLength: { message: "too long", value: 30 },              
                          })}></input>
                          {errors.email && <p className="error">Skriv email</p>}
                </div>
{/* ---------PHONE---------- */}
                <div>
                    <label htmlFor="phone">Telefon:</label>
                    <input type="num" name="phone" 
                        ref={register({
                            required: true,
                            minLength: { message: "too short", value: 2 },
                            maxLength: { message: "too long", value: 30 },              
                          })}></input>
                          {errors.phone && <p className="error">Skriv telefonnummer</p>}
                </div>
{/* ---------GENDER---------- */}
                <div>
                    <label htmlFor="gender">Køn:</label>
                    <select name="gender" 
                        ref={register({
                            required: true,           
                          })}>
                          
                        <option value="">Vælg køn</option>
                        <option value="f">Kvinde</option>
                        <option value="m">Mand</option>
                    </select>
                    {errors.gender && <p className="error">Vælg køn</p>}
                </div>
{/* ---------BIRTHDATE---------- */}
                <div>
                    <label htmlFor="birthdate">Fødselsdato:</label>
                    <input type="date" name="birthdate" 
                        ref={register({
                            required: true,             
                          })}></input>
                          {errors.birthdate && <p className="error">Vælg fødselsdato</p>}
                </div>
{/* ---------COMMENT---------- */}
                <div>
                    <label htmlFor="comment">Kommentar:</label>
                    <input type="textarea" className="comment" name="comment" 
                        ref={register({
                            required: true,
                            minLength: { message: "too short", value: 2 },
                            maxLength: { message: "too long", value: 30 },              
                          })}></input>
                          {errors.comment && <p className="error">Skriv kommentar</p>}
                </div>
{/* ---------SUBMIT---------- */}
                <input type="submit" className="submit" value="Send" />
                </form>
                </div>
                }
{/* ---------IF SUBMITTED, SHOW THIS CONTENT---------- */}
                {completed == true &&
                    <div>
                        <h2>Du er nu tilmeldt Rørdal Run</h2>
                        <p>Mange tak for din tilmelding. Du vil modtage en e-mail fra os med dit løbenummer, samt informationer vedr. Rørdal Run.</p>
                        <p>Tak og vi ses!</p>
                    </div>
                }
                </div>
            }
            </section>
        </div>
    )
}

export default PostForm