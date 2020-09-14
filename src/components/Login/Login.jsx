import React, { useState, useEffect } from 'react';
import './Login.scss'

function Login(props){

    const setLoginData = () => props.setLoginData

    const [username, setUsername] = useState("Indtast brugernavn")
    const [password, setPassword] = useState("Indtast password")
    const [token, setToken] = useState([])

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

    function logOut(e){
        e.preventDefault()
        sessionStorage.removeItem("token")
        props.setLoginData([])
    }

    useEffect(() => {
        if(token && token.user_id){
            props.setLoginData(token)
            sessionStorage.setItem("token", JSON.stringify(token))
        }
    }, [token])

    console.log(token)

    return (
        <>
        <section className="LoginSide">
        <h2>{props.loginData && props.loginData.username ? `Du er logget ind som ${props.loginData.username}`
        : null}</h2>
         <form>
            {!props.loginData.user_id && 
            <>
            <h2>Log ind</h2>
                <label>Brugernavn:</label>
                <input type='text' value={username} onClick={()=>{setUsername("")}} onChange={(e) =>{setUsername(e.target.value)}}></input>
                <label>Password:</label>
                <input type='password' value={password} onClick={()=>{setPassword("")}} onChange={(e) =>{setPassword(e.target.value)}}></input>
                <button onClick={(e)=> {getToken(e)}}>Log ind</button>
            </>
            }
            {props.loginData.user_id && <button onClick={(e) => {logOut(e)}}>Log ud</button>
            }
            
        </form>
        </section> 
        </>
    )
}

export default Login
