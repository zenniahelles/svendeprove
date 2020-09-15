import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductListPage = props => {
    const [categoryData, setCategoryData] = useState(null);
    return (
        <div>
            <div>
                <CategoryList setCategoryData={setCategoryData} />
            </div>
            <div>
                <ProductList data={categoryData} />
            </div>
        </div>
    )
}

// Deklarerer kategori component
const CategoryList = props => {

    // Deconstructor props
    const { setCategoryData } = props;
    // Sætter API hook
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        if(!apiData) {
            // Henter liste af kategorier
            fetch('https://api.mediehuset.net/bakeonline/categories')
                .then((res) => res.json())
                .then((data) => setApiData(data));
        }
    }, [apiData, setApiData]);

    const fetchCategoryData = id => {
            // Henter kategori detaljer + liste af produkter
            fetch('https://api.mediehuset.net/bakeonline/categories/' + id)
            .then((res) => res.json())
            .then((data) => setCategoryData(data.products.products))
    }

    return (
        <div>
            <ul>
                {/* Looper kategorier og indsætter knap til visning*/}
                {apiData && apiData?.categories.map((category) => {
                    return <li key={category.id} onClick={e => fetchCategoryData(category.id)}>
                                {category.title}
                            </li>
                })}
            </ul>
        </div>                    
    )
}

// Deklarerer product component
const ProductList = props => {
    const { data } = props;
    return (
        <div>
            {data && data.map(product => (
                <div key={"product-" + product.product_id}>
                    <div>
                        <Link to={"/product?id=" + product.product_id}>
                            <img src={product.image.fullpath} alt={product.title}></img>
                        </Link>        
                    </div>
                    <div>
                        <Link to={"/product?id=" + product.product_id}>
                            <h4>{product.title}</h4>
                        </Link>
                        <p>{product.teaser}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default ProductListPage;