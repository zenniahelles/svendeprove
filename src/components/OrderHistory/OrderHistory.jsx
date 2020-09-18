import React, {useState, useEffect} from 'react'
import './OrderHistory.scss'

function OrderHistory(props){

    const [historyData, setHistoryData] = useState([])

    //Laver timestamp om til en dato der kan læses

    const convertTime = (timestamp) => {
        let date = new Date(timestamp * 1000)
        let converted = date.toLocaleString("en-GB")
        return converted 
}

    //funktion til at hente ordre-liste

    const getHistory = async () => {
        let options = {
            headers: {
                'Authorization': `Bearer ${props.loginData.access_token}`,
            }
        }
        try {
            const url = `https://api.mediehuset.net/stringsonline/orders`
            const response = await fetch(url, options);
            const data = await response.json();
            setHistoryData(data)
        }
        catch (error) {
            console.log(error)
        }
    }
console.log(historyData)
//useeffect til at hente historik kun hvis brugeren er logget ind
useEffect(() => {
    if (props.loginData.access_token){
        getHistory()
    }
}, [])

//returnerer ud på siden:
    return (
        props.loginData.access_token ? 
        <section className="History">
            {historyData.items && historyData.items.map((item, index) =>{
               return (
                <article key={index} className="HistoryGrid">
                    <p className="item1">{convertTime(item.created)}</p>
                    <p className="item2">DKK {item.total},00</p>
                    <p className="item3">Ordrenr. <span>{item.id}</span></p>
                </article>
               )
            })}
        </section>
        : <h2>Du skal være logget ind får at se ordrehistorik</h2>
    )
}

export default OrderHistory