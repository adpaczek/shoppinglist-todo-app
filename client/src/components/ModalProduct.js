import { useState } from 'react'

const ModalProduct = ( {mode, setShowModal, getData, item, list}) => {

  const editMode = mode === 'edit-item' ? true : false

  const [data, setData] = useState({
    list_id: editMode ? list.list_id : null,
    name: editMode ? item.name : null,
    quantity: editMode ? item.quantity : null,
    unit: editMode ? item.unit : "Szt",
    completed: editMode ? item.completed: false,
    reference_image: editMode ? item.reference_image: null
  })

  const postData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8000/lists/${list.id}/items`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        console.log(response)
        setShowModal(false)
        getData()
      }

    } catch (err) {
      console.error(err)
    }
  }

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
            <label>Or select from list:</label>
            <select
              name="name"
              value={data.name}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="Chleb">Chleb</option>
              <option value="Mleko">Mleko</option>
              <option value="Woda">Woda</option>
              <option value="Ser">Ser</option>
            </select>
            <label>Enter quantity:</label>
            <input
              required
              maxLength={30}
              placeholder="Quantity goes here"
              name="quantity"
              value={data.quantity}
              onChange={handleChange}/>
            <label>Select unit:</label>
            <select 
              id="unit" 
              name="unit" 
              required 
              value={data.unit}
              onChange={handleChange}>
              <option value="Szt">Szt</option>
              <option value="Kg">Kg</option>
              <option value="L">L</option>
            </select>
            
            <input className={mode} type="submit" onClick={editMode ? '': postData}/>
          </form>
        </div>
      </div>
    );
  }
  
  export default ModalProduct;
  