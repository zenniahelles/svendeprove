import React, { useState, useEffect } from 'react';
import './Login.scss'
import { Link } from 'react-router-dom'

function Login(props){

    const [username, setUsername] = useState("Indtast brugernavn")
    const [password, setPassword] = useState("Indtast password")
    const [token, setToken] = useState([])

//Funktion der poster med data fra login-formen 
    async function getToken(e){
        e.preventDefault()
        let formData = new FormData()

        formData.append('username', username)
        formData.append('password', password)

        let options = {
            method: "POST",
            body: formData
        }

        try {
        const url = `https://api.mediehuset.net/token`
            const response = await fetch(url, options)
            const data = await response.json()
            setToken(data)
        }
        catch (error) {
            console.log(error)
        }
    }
//Funtktion til at logge ud med
    function logOut(e){
        e.preventDefault()
        sessionStorage.removeItem("token")
        props.setLoginData([])
    }
//Hvis der er en token med, så sæt LoginData
    useEffect(() => {
        if(token && token.user_id){
            props.setLoginData(token)
            sessionStorage.setItem("token", JSON.stringify(token))
        }
    }, [token])

    console.log(token)
//returnerer ud på siden
    return (
        <>
        <section className="LoginSide">
        <h2>{props.loginData && props.loginData.username ? `Du er logget ind som ${props.loginData.username}`
        : null}</h2>

         <form>
            {!props.loginData.user_id && 
            <>
            <h2>Login</h2>
            <p>Indtast brugernavn og adgangskode for at logge på</p>
                <label>Brugernavn:</label>
                <input type='text' value={username} onClick={()=>{setUsername("")}} onChange={(e) =>{setUsername(e.target.value)}}></input>
                <label>Adgangskode:</label>
                <input type='password' value={password} onClick={()=>{setPassword("")}} onChange={(e) =>{setPassword(e.target.value)}}></input>
                <button onClick={(e)=> {getToken(e)}}>Log ind</button>
            </>
            }
            
            {props.loginData.user_id && 
            <>
            <Link className="tohistory" to="/history"><button>Se ordrehistorik</button></Link>
            
            <button onClick={(e) => {logOut(e)}}>Log ud</button>
            </>
            }
            
        </form>
        </section> 
        </>
    )
}

export default Login
