import { useState } from 'react'
import {useCookies} from 'react-cookie'

const ModalProduct = ( {mode, setShowModal}) => {

  const editMode = mode === 'edit-item' ? true : false

  const [data, setData] = useState({
    name: "",
    quantity: 1,
    unit: "",
    completed: false,
    reference_image: null
  })

  const handleChange = (e) => {
    const {name, value} = e.target

    setData(data => ({
      ...data,
      [name] : value
    }))
    console.log(data)
  }

  

    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>Let's {mode} your item:</h3>
            <button onClick={() => setShowModal(false)}>X</button>
          </div>

          <form>
            <input 
              required
              maxLength={100}
              placeholder="Item goes here"
              name="name"
              value={data.name}
              onChange={handleChange}/>
            <br/>
            <input
              required
              maxLength={30}
              placeholder="Quantity goes here"
              name="quantity"
              value={data.quantity}
              onChange={handleChange}/>
            <br/>
            <select 
              id="unit" 
              name="unit" 
              required 
              onChange={handleChange}>
              <option value={data.unit}>Szt</option>
              <option value={data.unit}>Kg</option>
              <option value={data.unit}>L</option>
            </select>
            <br/>
            <label>Upload reference image if you want:</label>
            <input 
              type="file" 
              id="reference_image" 
              name="reference_image"
              value={data.reference_image}
              onChange={handleChange}>
            </input>
            <input className={mode} type="submit"/>
          </form>
        </div>
      </div>
    );
  }
  
  export default ModalProduct;
  