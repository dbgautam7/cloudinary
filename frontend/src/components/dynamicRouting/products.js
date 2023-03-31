import React from 'react'
import { useParams } from 'react-router-dom'

const Products = ({ data }) => {
  const { id, category } = useParams()
  console.log(id,category,"$$")

  const selectedItem = data?.find(
    item => item.id === parseInt(id) && item.category === category
  );

  if (!selectedItem) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>{selectedItem.brand}</p>
      <p>{selectedItem.description}</p>
      <p>{selectedItem.price}</p>
      <p>{selectedItem.rating}</p>
      <p>{selectedItem.discountPercentage}</p>
    </div>
  );
};

export default Products
