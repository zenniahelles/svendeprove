import React, {useContext, useState, useEffect} from 'react'
import Style from './Ratings.module.scss'

function Ratings(props) {
    const [runRating, setRunRating] = useState([])
    const [avgRating, setAvgRating] = useState([])
    const [selectedRoute, setSelectedRoute] = useState(0)
    const [comment, setComment] = useState("")
    const [stars, setStars] = useState(0)
    const [msg, setMsg] = useState("")

    const getRunRating = async (id) => {
        let url = `https://api.mediehuset.net/rordal/ratings/list/${id}`
        let res = await props.doFetch(url)
        setRunRating(res)
      }

    const getAvgRunRating = async (id) => {
        let url = `https://api.mediehuset.net/rordal/ratings/average/${id}`
        let res = await props.doFetch(url)
        setAvgRating(res)
    }

    const postRating = async () => {
        let url = `https://api.mediehuset.net/rordal/ratings`
        
        let formData = new FormData()
        formData.append('num_stars', parseInt(stars))
        formData.append('run_id', parseInt(selectedRoute))
        formData.append('comment', comment)


        let options = {
            method: "POST",
            body: formData,
            headers: {
                'Authorization' : `Bearer ${props.loginData.access_token}`
            }
        }
              
        fetch(url, options)
        .then(response => response.json())
        .then(json => console.log(json))
        .then(setMsg("Vi har modtaget din bedømmelse"))
        .then(setComment(""))
        .catch(error => console.log(error))
    }

/*     const deleteRating = async (id) => {
        let options = {
            method: "DELETE",
            headers: {
                'Authorization' : `Bearer ${loginData.access_token}`
            }
        }
        let url = `https://api.mediehuset.net/rordal/ratings/${id}`
        let res = await doFetch(url, options)
        setMsg("Din kommentar er slettet")
        console.log(res)
    } */

    const getCommentData = (id) => {
        setSelectedRoute(id)
        getAvgRunRating(id)
        getRunRating(id)
    }

    useEffect(() => {
        getCommentData(selectedRoute)
        let timer = setTimeout(() => {
            setMsg("")
            if (msg == ""){
                clearTimeout(timer)
            }
        }, 2000);
    }, [msg])

    return (
        <>
        <section className={Style.mainContainer}>
            <div className={Style.topContainer}>
                <h2>Kommentarer fra Rørdal Runners</h2>
                <p>Her kan du kommentere et løb eller se hvad andre løbere har sagt om vores ruter</p>
            </div>    
        
        <section className={Style.gridContainer}>
            <div>
                <h3 className={selectedRoute == 3 ? Style.selected :  Style.default} onClick={() => {getCommentData(3)}}>1 Mile</h3>
            </div>
            <div>
                <h3 className={selectedRoute == 2 ? Style.selected : Style.default} onClick={() => {getCommentData(2)}}>5 Km</h3>
            </div>
            <div>
                <h3 className={selectedRoute == 1 ? Style.selected : Style.default} onClick={() => {getCommentData(1)}}>10 Km</h3>
            </div>
        </section>
        {!selectedRoute == 0 && <section>
        <b className={Style.msg}>{msg}</b>
            <div className={Style.form}>                
                <div>
                <label>Antal stjerner</label>
                <select onChange={(e) => {setStars(e.target.value)}}>
                    <option>Vælg antal stjerner</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                </div>
                <div>
                    <label>Din kommentar</label>
                    <input value={comment} onClick={() => setComment("")} onChange={(e) => {setComment(e.target.value)}}></input>
                </div>
                {props.loginData.access_token ? <button className={Style.formBtn} onClick={() => postRating()}>Send</button> : <p>Du skal være logget ind for at bedømme</p>}
            </div>
        </section>}
        <section className={Style.commentContainer}>
            <div>
                <ul className={Style.listContainer}>
                {runRating.items && runRating.items.map((item, index) => {
                    return (
                    <li className={Style.listGridItem}>
                        <p>Kommentar: {item.comment}</p>
                        <p>Antal stjerner: {item.num_stars}</p>
{/*                         <button onClick={(e)=>{deleteRating(selectedRoute)}}>Slet</button>
 */}                    </li>
                    )
                })}
                {runRating.items && <li className={Style.listGridItem}>
                    <p>Gennemsnit: </p>
                    <p>{avgRating && Math.floor(avgRating.average_num_stars)} stjerner</p>
                </li>}
                </ul>
            </div>
        </section>
        
    </section>
</>
)
}
export default Ratings