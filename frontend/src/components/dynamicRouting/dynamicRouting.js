import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import Products from './products';

const DynamicRouting = () => {
  const [data, setData] = useState()

  useEffect(() => {
    fetch(`https://dummyjson.com/products`)
      .then(response => response.json())
      .then(data => {
        setData(data.products)
        console.log(data.products, data, "data")
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <h1>This is Dynamic Routing in React</h1>
      <div>
        {data ? data.map((item, id) => {
          return (
            <div key={id}>
              <Link to={`/dynamicRouting/${item.category}/${item.id}`} >{item.title}</Link>
            </div>
          )
        }) : <p>Loading...</p>}
      </div>
      <Products data={data} />

    </>
  )
}

export default DynamicRouting
