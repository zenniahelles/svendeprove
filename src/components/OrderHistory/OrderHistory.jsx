import React, {useState, useEffect} from 'react'

function OrderHistory(props){

    const [historyData, setHistoryData] = useState([])

    //funktion til at hente ordre-liste

    const getHistory = async () => {
        let options = {
            headers: {
                'Authorization': `Bearer ${props.loginData.access_token}`,
            }
        }
        try {
            const url = `https://api.mediehuset.net/stringsonline/orders/`
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data)
            setHistoryData(data)
        }
        
        catch (error) {
            console.log(error)
        }
    }

useEffect(() => {
    if (props.loginData.access_token){
        getHistory()
    }
}, [])

//returnerer ud på siden:
    return (
        <section>
            {historyData.items && historyData.items.map((item, index) =>{
               return (
                <div key={index}>
                    <p>{item.created}</p>
                    <p>DKK {item.total},00</p>
                    <p>Ordrenr. {item.id}</p>
                </div>
               )
            })}
        </section>
    )
}

export default OrderHistory