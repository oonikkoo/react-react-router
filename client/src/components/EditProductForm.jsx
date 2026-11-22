import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProductForm() {
  const { productId } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [url, setURL] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    const getProduct = async () => {
      const result = await axios.get(`http://localhost:4001/products/${productId}`)
      const product = result.data.data

      setName(product.name)
      setURL(product.image)
      setPrice(product.price)
      setDescription(product.description)
    }

    getProduct()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    await axios.put(`http://localhost:4001/products/${productId}`, {
      name: name,
      image: url,
      price: price,
      description: description
    })

    navigate('/')
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Edit Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url here"
            value={url}
            onChange={(event) => setURL(event.target.value)}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Enter description here"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default EditProductForm;
