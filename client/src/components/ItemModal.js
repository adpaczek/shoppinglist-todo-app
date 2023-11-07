import { useState } from 'react'
import {useCookies} from 'react-cookie'

const ItemModal = ( { mode, setShowItemModal, getData, list, item}) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const editMode = mode === 'edit' ? true : false

  const [data, setData] = useState({
    name: editMode ? item.name : '',
    quantity: editMode ? item.quantity : 1,
    unit: editMode ? item.unit : '',
    completed: editMode ? item.completed : false,
    reference_image: null,
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/lists/${item.list_id}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        setShowItemModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };


  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/lists/${item.list_id}/items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        setShowItemModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  }


  const handleChange = (e) => {
    console.log('changing', e)
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
            <button onClick={() => setShowItemModal(false)}>X</button>
          </div>

          <form>
            <input 
              required
              maxLength={100}
              placeholder="Item name goes here"
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
              value={data.unit}
              onChange={handleChange}>
              <option value="szt">Szt</option>
              <option value="kg">Kg</option>
              <option value="l">L</option>
            </select>
            <br/>
            <input 
              type="file" 
              id="reference_image" 
              name="reference_image"
              value={data.refernece_image}>
            </input>
            <input className={mode} type="submit" onClick={editMode ? editData : postData} />
          </form>
        </div>
      </div>
    );
  }
  
  export default ItemModal;
  