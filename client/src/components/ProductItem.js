import { useState} from 'react'
import ModalProduct from './ModalProduct.js'


const ProductItem = ({ list, item, getData }) => {

  const [showModal2, setShowModal2] = useState(false)
  const [isChecked, setIsChecked] = useState(item.completed);

  const toggleCompletion = async () => {
    try {
      const response = await fetch(`http://localhost:8000/lists/${list.id}/items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !isChecked }), // Przełącz stan zaznaczenia
      });
      if (response.status === 200) {
        getData();
        setIsChecked(!isChecked); // Zaktualizuj lokalny stan
      }
    } catch (err) {
      console.error(err);
    }
  }

  const deleteProduct = async() => {
    try {
      const response = await fetch(`http://localhost:8000/lists/${list.id}/items/${item.id}`, {
        method: 'DELETE'
      })
      if (response.status === 200) {
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

    return (
      <li className={`product-item ${isChecked ? 'completed' : ''}`}>
        
        <div className="info-container-item">
          <p style={{ fontWeight: 'bold', marginRight: '12px' }}>{item.name}</p>
          <p style={{ marginRight: '2px' }}>{item.quantity}</p>
          <p>{item.unit}</p>
        </div>

        <div className="button-container-item">
          <button className="toggle" onClick={toggleCompletion}>CHECK</button>
          <button className="delete" onClick={deleteProduct}>DELETE ITEM</button>
        </div>
        {showModal2 && <ModalProduct mode={'edit'} setShowModal={setShowModal2} getData={getData} item={item} list={list}/>}

      </li>
    );
  }
  
  export default ProductItem;
  