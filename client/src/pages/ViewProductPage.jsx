import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ViewProductPage() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const [product, setProduct] = useState(null)

  const getProduct = async () => {
    const result = await axios.get(`http://localhost:4001/products/${productId}`)
    setProduct(result.data.data)
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div>
      <h1>View Product Page</h1>

      {product ? (
        <div className="view-product-container">
          <h2>Name: {product.name}</h2>
          <p>{product.price} THB</p>
          <p>{product.description}</p>
        </div>) : null}
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default ViewProductPage;
