import React, { useState, useEffect } from 'react'
import './Fetch.scss'

function Fetch(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
      if (!data) {
        fetch("https://api.mediehuset.net/rordal/pages/4")
          .then((res) => res.json())
          .then((apidata) => setData(apidata));
      }
    }, [data, setData]);

    return (
        <section className="Fetch">
            {data &&
            <>
                <h2 key={data.item.id}>{data.item.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: data.item.content}}></div>
            </>
            }
        </section>
    )
}

export default Fetch
