import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import './Checkout.scss'
import '../../GlobalStyles.scss'

function Checkout(props) {
//States til at skifte indholdet når formen er udfyldt
    const [completed, setCompleted] = useState(false)
    const [latestOrder, setLatestOrder] = useState([])
    const [orderComplete, setOrderComplete] = useState([])

// states til REACT-HOOK-FORM
    const { register, handleSubmit, errors } = useForm();

// --- Hent Seneste køb
    const getLatestOrder = async () => {
        let options = {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${props.loginData.access_token}`,
            }
        }
        try {
            let url = `https://api.mediehuset.net/stringsonline/orders/${orderComplete.order_id}`
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data)
            setLatestOrder(data)
        }
        catch (error) {
            console.log(error)
        }
    }

//------- formvalidering:
    
    const onSubmit = async values => {
       
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
            const url = `https://api.mediehuset.net/stringsonline/orders`
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data)
            setOrderComplete(data)
            setCompleted(true)
        } 
        catch(error) {
            console.error(error);
        } 
    }
//useEffect hook til at opdatere når købet er gennemført. Vis derefter Latest Order
    useEffect(() => {
        if (orderComplete.status == true) {
            getLatestOrder()
        }
    }, [orderComplete])

    // Returner HTML
    return (
        <div> 
            <section className="Kasse">
            
            {!props.loginData.access_token ? <div><p>Du skal være logget ind for at kunne købe.</p><Link to="/login"><button>Log Ind</button></Link></div> : 
        <div>
                    {completed == false && <div>
                        <h2>Kasse</h2>
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
{latestOrder && latestOrder.order && latestOrder.order.orderlines &&
                <section className="ReceiptGrid">

                    <section className="griditem1">
                        <Link to="/forside"><button>TAK FOR DIN BESTILLING</button></Link>
                        <article>
                            <p>Ordrenr. <span>{latestOrder.order.id}</span></p>

                            {latestOrder.order.orderlines.map((item, i) => {
                                return <div className="productline"><p className="left">Produkt</p> <span>{item.name}</span> <p className="middle">{item.quantity} stk.</p> <p className="right">DKK {item.price}</p></div>
                            })}

                            <p className="left">I alt</p><p className="right">DKK {latestOrder.order.total}</p>
                        </article>
                    </section>

                    <section className="griditem2">
                        <div>
                            <h3>Faktureringsadresse</h3>
                            <p>{latestOrder.order.firstname} {latestOrder.order.lastname}</p>
                            <p>{latestOrder.order.address}</p>
                            <p>{latestOrder.order.zipcode} {latestOrder.order.city}</p>
                        </div>

                        <div>
                            <h3>Leveringsadresse</h3>
                            <p>{latestOrder.order.firstname} {latestOrder.order.lastname}</p>
                            <p>{latestOrder.order.address}</p>
                            <p>{latestOrder.order.zipcode} {latestOrder.order.city}</p>
                        </div>
                    </section>

                </section>
            }
                </div>
            }
            </section>
        </div>
    )
}

export default Checkout