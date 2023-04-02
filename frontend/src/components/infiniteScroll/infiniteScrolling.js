import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const InfiniteScrolling = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 15;

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${(page-1) * limit}&totalCount=${totalCount}`)
      .then((response) => response.json())
      .then((newData) => {
        console.log(newData,"newData")
        setData((prevData) => [...prevData, ...newData.products]);
        setTotalCount(newData.totalCount);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [page, totalCount]);

  const handleInfiniteScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setPage(prevPage => prevPage + 1);
      setLoading(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, []);

  return (
    <div>
      <Link to="/">Back to Home</Link>
      <ul>
        {data.map((item, id) => (
          <li key={id}>
            {item.id}
            <br></br>
            {item.title}
            <br></br>
            {item.description}
            <br></br>
            {item.price}
            <br></br>
            {<img src={item.images[0]} alt="img" />}
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScrolling;
